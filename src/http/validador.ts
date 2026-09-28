import {
    ValidationException,
    RequestBodyUndefinedException,
    InvalidBodyException,
    RequiredFieldException,
    InvalidTypeException,
    EmptyArrayException,
    InvalidBodyLengthException,
    InvalidBodyPatternException,
    EmptyBodyException
} from "./exceptions.js";

import {
    ArrayType,
    ObjectType,
    Types,
} from "./validatorTypes.js";

import type {
    FileFields,
    ValidatorType,
    ObjectFields,
} from "./validatorTypes.js";

type FieldDefinition = {
    type: ValidatorType;
    required?: boolean;
    validator?: (
        value: unknown
    ) => unknown | ValidationException;
};

interface BodyFields {
    [name: string]: FieldDefinition;
}

interface Body {
    [name: string]: unknown;
}

type TextValidationOptions = {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    allowEmpty?: boolean;
    trim?: boolean;
    validator?: (
        value: string
    ) => string | ValidationException;
};

const Validator = {
    body(body: Body, fields: BodyFields) {
        if (body === undefined) {
            throw new RequestBodyUndefinedException();
        }

        if (
            typeof body !== "object" ||
            body === null ||
            Array.isArray(body)
        ) {
            throw new InvalidBodyException();
        }

        return validateObject(body, fields);
    },

    text(body: string, options: TextValidationOptions = {}) {
        const {
            minLength,
            maxLength,
            pattern,
            allowEmpty = true,
            trim = false,
            validator = undefined
        } = options;

        let value = trim ? body.trim() : body;

        if (!allowEmpty && value.length === 0) {
            throw new EmptyBodyException();
        }

        if (minLength !== undefined && value.length < minLength) {
            throw new InvalidBodyLengthException(minLength, "min");
        }

        if (maxLength !== undefined && value.length > maxLength) {
            throw new InvalidBodyLengthException(maxLength, "max");
        }

        if (pattern !== undefined && !pattern.test(value)) {
            throw new InvalidBodyPatternException(pattern);
        }

        if (validator) {
            const result = validator(value);
            if (result instanceof ValidationException) {
                throw result;
            }

            value = result;
        }

        return value;
    },

    file: (file: any, options: FileFields = {}) => {
        const {
            canBeEmpty = false,
            maxNumberOfFiles,
            minNumberOfFiles
        } = options;

        /*
         * No file
         */
        if (!file) {
            if (canBeEmpty) {
                return null;
            }

            throw new ValidationException(
                "File is required but not provided."
            );
        }

        /*
         * Multiple files
         */
        if (Array.isArray(file)) {

            if (file.length === 0) {
                if (canBeEmpty) {
                    return null;
                }

                throw new ValidationException(
                    "At least one file is required."
                );
            }

            if (
                maxNumberOfFiles !== undefined &&
                file.length > maxNumberOfFiles
            ) {
                throw new ValidationException(
                    `Maximum number of files allowed is ${maxNumberOfFiles}.`
                );
            }

            if (
                minNumberOfFiles !== undefined &&
                file.length < minNumberOfFiles
            ) {
                throw new ValidationException(
                    `Minimum number of files required is ${minNumberOfFiles}.`
                );
            }

            return file.map((f) => validateFile(f, options));
        }

        /*
         * Single file
         */
        return validateFile(file, options);
    }
};


function validateFile(
    file: any,
    options: FileFields = {}
) {
    const {
        maxSizeMb,
        minSizeMb,
        mimeTypes,
        extensions,
        fileNamePattern
    } = options;


    /*
     * Validate object
     */
    if (
        typeof file !== "object" ||
        file === null
    ) {
        throw new ValidationException(
            "Invalid file."
        );
    }


    /*
     * Validate size
     */
    if (
        typeof file.size !== "number" ||
        file.size < 0
    ) {
        throw new ValidationException(
            "Invalid file size."
        );
    }


    /*
     * Maximum size
     */
    if (
        maxSizeMb !== undefined &&
        file.size > maxSizeMb * 1024 * 1024
    ) {
        throw new ValidationException(
            `File size exceeds the maximum limit of ${maxSizeMb} MB.`
        );
    }


    /*
     * Minimum size
     */
    if (
        minSizeMb !== undefined &&
        file.size < minSizeMb * 1024 * 1024
    ) {
        throw new ValidationException(
            `File size is below the minimum limit of ${minSizeMb} MB.`
        );
    }


    /*
     * MIME type
     */
    if (mimeTypes !== undefined) {

        const allowedMimeTypes = Array.isArray(mimeTypes)
            ? mimeTypes
            : [mimeTypes];

        if (
            typeof file.mimetype !== "string" ||
            !allowedMimeTypes.includes(file.mimetype)
        ) {
            throw new ValidationException(
                `File type is not allowed. Allowed types are: ${allowedMimeTypes.join(", ")}`
            );
        }
    }


    /*
     * File extension
     */
    if (extensions !== undefined) {

        const allowedExtensions = (
            Array.isArray(extensions)
                ? extensions
                : [extensions]
        ).map(
            extension =>
                extension
                    .replace(/^\./, "")
                    .toLowerCase()
        );

        if (typeof file.originalname !== "string") {
            throw new ValidationException(
                "Invalid file name."
            );
        }

        const extension = file.originalname
            .split(".")
            .pop()
            ?.toLowerCase();

        if (
            !extension ||
            !allowedExtensions.includes(extension)
        ) {
            throw new ValidationException(
                `File extension is not allowed. Allowed extensions are: ${allowedExtensions.join(", ")}`
            );
        }
    }

    /*
     * File name pattern
     */
    if (
        fileNamePattern !== undefined &&
        !fileNamePattern.test(file.originalname)
    ) {
        throw new ValidationException(
            "File name does not match the required pattern."
        );
    }


    return file;
}

function validateObject(
    body: unknown,
    fields: ObjectFields,
    parentPath = ""
): Record<string, unknown> {

    if (
        typeof body !== "object" ||
        body === null ||
        Array.isArray(body)
    ) {
        throw new InvalidBodyException();
    }

    const bodyData = body as Record<string, unknown>;
    const data: Record<string, unknown> = {};

    for (const name in fields) {
        const field = fields[name];

        if (!field) {
            continue;
        }

        const fieldPath = parentPath
            ? `${parentPath}.${name}`
            : name;

        let value = bodyData[name];

        // Required field
        if (field.required && value === undefined) {
            throw new RequiredFieldException(fieldPath);
        }

        // Optional field not provided
        if (value === undefined) {
            continue;
        }

        // Validate type
        if (!validateType(field.type, value, fieldPath)) {
            const type = getTypeDescription(field.type);

            throw new InvalidTypeException(
                fieldPath,
                type,
                whatTypeIs(value)
            );
        }

        // Custom validator
        if (field.validator) {
            const result = field.validator(value);

            if (result instanceof ValidationException) {
                throw result;
            }

            value = result;
        }

        data[name] = value;
    }

    return data;
}

function validateType(
    type: ValidatorType | undefined,
    value: unknown,
    fieldName = ""
): boolean {

    // Multiple types
    if (Array.isArray(type)) {
        return type.some((t) =>
            validateType(t, value, fieldName)
        );
    }

    // Array
    if (type instanceof ArrayType) {

        if (!Array.isArray(value)) {
            return false;
        }

        if (!type.empty && value.length === 0) {
            throw new EmptyArrayException(fieldName);
        }

        for (const item of value) {
            if (!validateType(type.type, item, fieldName)) {
                return false;
            }
        }

        return true;
    }

    // Object structure
    if (type instanceof ObjectType) {

        if (
            typeof value !== "object" ||
            value === null ||
            Array.isArray(value)
        ) {
            return false;
        }

        validateObject(
            value,
            type.fields,
            fieldName
        );

        return true;
    }

    // Primitive types
    switch (type?.description) {
        case "any":
            return true;

        case "null":
            return value === null;

        case "string":
            return typeof value === "string";

        case "number":
        case "float":
            return typeof value === "number";

        case "int":
            return (
                typeof value === "number" &&
                Number.isInteger(value)
            );

        case "boolean":
            return typeof value === "boolean";

        case "object":
            return (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            );
    }

    return false;
}

function getTypeDescription(
    type: ValidatorType
): string {

    if (Array.isArray(type)) {
        return type
            .map((t) => getTypeDescription(t))
            .join(" | ");
    }

    return type.description || "";
}

function whatTypeIs(value: unknown): string {

    if (
        typeof value === "number" &&
        Number.isInteger(value)
    ) {
        return "int";
    }

    if (Array.isArray(value)) {
        return "array";
    }

    if (value === null) {
        return "null";
    }

    return typeof value;
}

export {
    Validator
};
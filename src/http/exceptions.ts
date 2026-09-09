class ValidationException extends Error {
    constructor(message: string) {
        super(message);

        this.name = "ValidationException";
    }
}

class RequestBodyUndefinedException extends ValidationException {
    constructor() {
        super("Request body is undefined");

        this.name = "RequestBodyUndefinedException";
    }
}

class InvalidBodyException extends ValidationException {
    constructor() {
        super("Request body must be an object");

        this.name = "InvalidBodyException";
    }
}

class EmptyBodyException extends ValidationException {
    constructor() {
        super("Body must not be empty");

        this.name = "EmptyBodyException";
    }
}

class InvalidBodyLengthException extends ValidationException {
    constructor(length: number, type: "min" | "max") {
        const message =
            type === "min"
                ? `The body length must be at least ${length} characters`
                : `The body length must not exceed ${length} characters`;

        super(message);

        this.name = "InvalidBodyLengthException";
    }
}

class InvalidBodyPatternException extends ValidationException {
    constructor(pattern: RegExp) {
        super(`The body does not match the required pattern: ${pattern}`);

        this.name = 'InvalidBodyPatternException';
    }
}

class RequiredFieldException extends ValidationException {
    constructor(
        public readonly field: string,
    ) {
        super(`Field "${field}" is required`);

        this.name = "RequiredFieldException";
    }
}

class InvalidTypeException extends ValidationException {
    constructor(
        public readonly field: string,
        public readonly expected: string | undefined,
        public readonly received: string,
    ) {
        super(
            `Field "${field}" must be of type ${expected}, received ${received}`,
        );

        this.name = "InvalidTypeException";
    }
}

class CustomValidationException extends ValidationException {
    constructor(
        public readonly field: string,
    ) {
        super(`Field "${field}" failed custom validation`);

        this.name = "CustomValidationException";
    }
}

class EmptyArrayException extends ValidationException {
    constructor(
        public readonly field: string,
    ) {
        super(`Field "${field}" must not be an empty array`);

        this.name = "EmptyArrayException";
    }
}

export {
    ValidationException,
    RequestBodyUndefinedException,
    InvalidBodyException,
    EmptyBodyException,
    InvalidBodyLengthException,
    InvalidBodyPatternException,
    RequiredFieldException,
    InvalidTypeException,
    CustomValidationException,
    EmptyArrayException
}
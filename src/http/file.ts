const MimeTypes = {
    // Documents
    "pdf": "application/pdf",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "odt": "application/vnd.oasis.opendocument.text",
    "rtf": "application/rtf",
    "tex": "application/x-tex",
    "txt": "text/plain",
    "md": "text/markdown",

    // Spreadsheets
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "ods": "application/vnd.oasis.opendocument.spreadsheet",
    "csv": "text/csv",
    "tsv": "text/tab-separated-values",

    // Presentations
    "ppt": "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "odp": "application/vnd.oasis.opendocument.presentation",

    // Images
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "bmp": "image/bmp",
    "webp": "image/webp",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "avif": "image/avif",
    "heic": "image/heic",
    "heif": "image/heif",
    "apng": "image/apng",
    "jxl": "image/jxl",
    "psd": "image/vnd.adobe.photoshop",
    "ai": "application/postscript",
    "eps": "application/postscript",

    // Video
    "mp4": "video/mp4",
    "avi": "video/x-msvideo",
    "mov": "video/quicktime",
    "wmv": "video/x-ms-wmv",
    "flv": "video/x-flv",
    "mkv": "video/x-matroska",
    "webm": "video/webm",
    "mpeg": "video/mpeg",
    "mpg": "video/mpeg",
    "m4v": "video/x-m4v",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    "ts": "video/mp2t",

    // Audio
    "mp3": "audio/mpeg",
    "wav": "audio/wav",
    "ogg": "audio/ogg",
    "oga": "audio/ogg",
    "opus": "audio/opus",
    "aac": "audio/aac",
    "m4a": "audio/mp4",
    "flac": "audio/flac",
    "weba": "audio/webm",
    "mid": "audio/midi",
    "midi": "audio/midi",

    // Web
    "html": "text/html",
    "htm": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "mjs": "text/javascript",
    "cjs": "text/javascript",
    "jsx": "text/jsx",
    "tsx": "video/mp2t",

    // Data / Configuration
    "json": "application/json",
    "xml": "application/xml",
    "yaml": "application/yaml",
    "yml": "application/yaml",
    "toml": "application/toml",
    "ini": "text/plain",
    "env": "text/plain",

    // Programming
    "c": "text/x-c",
    "h": "text/x-c",
    "cpp": "text/x-c++",
    "cc": "text/x-c++",
    "cxx": "text/x-c++",
    "hpp": "text/x-c++",
    "java": "text/x-java-source",
    "py": "text/x-python",
    "pyw": "text/x-python",
    "rb": "text/x-ruby",
    "go": "text/x-go",
    "rs": "text/rust",
    "php": "application/x-httpd-php",
    "sql": "application/sql",
    "sh": "application/x-sh",
    "bash": "application/x-sh",
    "bat": "application/x-msdos-program",
    "ps1": "application/x-powershell",
    "lua": "text/x-lua",
    "swift": "text/x-swift",
    "kt": "text/x-kotlin",
    "kts": "text/x-kotlin",
    "dart": "application/vnd.dart",

    // Archives / Compression
    "zip": "application/zip",
    "rar": "application/vnd.rar",
    "7z": "application/x-7z-compressed",
    "tar": "application/x-tar",
    "gz": "application/gzip",
    "gzip": "application/gzip",
    "bz": "application/x-bzip",
    "bz2": "application/x-bzip2",
    "xz": "application/x-xz",
    "zst": "application/zstd",
    "tgz": "application/gzip",
    "tar.gz": "application/gzip",
    "tar.bz2": "application/x-bzip2",
    "tar.xz": "application/x-xz",

    // Executables / Applications
    "exe": "application/vnd.microsoft.portable-executable",
    "msi": "application/x-msi",
    "dll": "application/vnd.microsoft.portable-executable",
    "appimage": "application/x-iso9660-appimage",
    "deb": "application/vnd.debian.binary-package",
    "rpm": "application/x-rpm",
    "apk": "application/vnd.android.package-archive",
    "ipa": "application/octet-stream",

    // Disk / Binary
    "iso": "application/x-iso9660-image",
    "img": "application/octet-stream",
    "bin": "application/octet-stream",
    "dmg": "application/x-apple-diskimage",

    // Fonts
    "ttf": "font/ttf",
    "otf": "font/otf",
    "woff": "font/woff",
    "woff2": "font/woff2",

    // E-books
    "epub": "application/epub+zip",
    "mobi": "application/x-mobipocket-ebook",
    "azw": "application/vnd.amazon.ebook",
    "azw3": "application/vnd.amazon.ebook",

    // 3D / CAD
    "stl": "model/stl",
    "obj": "model/obj",
    "gltf": "model/gltf+json",
    "glb": "model/gltf-binary",
    "3ds": "image/x-3ds",
    "dae": "model/vnd.collada+xml",
    "step": "model/step",
    "stp": "model/step",
    "iges": "model/iges",
    "igs": "model/iges",

    // Flash / Legacy
    "swf": "application/x-shockwave-flash",

    // Other common formats
    "ics": "text/calendar",
    "vcf": "text/vcard",
    "vtt": "text/vtt",
    "srt": "application/x-subrip",
};

export { MimeTypes };
export interface UploadResponse {
    rawUrl: string;
    compressedUrl: string;
    thumbnailUrl?: string;
}

export interface FileError {
    error: boolean;
    errorMsg: string;
}
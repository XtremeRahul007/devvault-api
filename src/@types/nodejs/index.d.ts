declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        LOG_PATH: string;
        STORAGE_PATH: string;
        UPLOADS_PATH: string;
        FILES_PATH: string;
        METADATA_PATH: string;
        VAULT_PATH: string;
        MAX_FILE_SIZE: string;
    }
}
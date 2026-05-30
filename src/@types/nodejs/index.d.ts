declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        LOG_PATH: string;
        STORAGE_PATH: string;
    }
}
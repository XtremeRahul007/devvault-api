import path from "node:path";


export const infrastructureConfig = {
    PORT: Number(process.env.PORT) || 5000,
    STORAGE_PATH: process.env.STORAGE_PATH || "storage",
    LOG_PATH: process.env.LOG_PATH || "logs"
}


export const REQUIRED_DIRECTORIES = {
    STORAGE: path.join(process.cwd(), infrastructureConfig.STORAGE_PATH),
    LOGS: path.join(process.cwd(), infrastructureConfig.LOG_PATH)
}
export const INFRA_DIR_LIST = Object.values(REQUIRED_DIRECTORIES);
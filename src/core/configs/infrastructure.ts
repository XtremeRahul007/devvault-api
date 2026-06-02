import path from "node:path";

export const infrastructureConfig = {
    PORT: Number(process.env.PORT),
    STORAGE_PATH: process.env.STORAGE_PATH,
    UPLOADS_PATH: process.env.UPLOADS_PATH,
    FILES_PATH: process.env.FILES_PATH,
    METADATA_PATH: process.env.METADATA_PATH,
    VAULT_PATH: process.env.VAULT_PATH,
    LOG_PATH: process.env.LOG_PATH
}

export const REQUIRED_DIRECTORIES = {
    STORAGE: path.join(process.cwd(), infrastructureConfig.STORAGE_PATH),
    LOGS: path.join(process.cwd(), infrastructureConfig.LOG_PATH),
    UPLOADS: path.join(process.cwd(), infrastructureConfig.UPLOADS_PATH),
    FILES: path.join(process.cwd(), infrastructureConfig.FILES_PATH),
    METADATA: path.join(process.cwd(), infrastructureConfig.METADATA_PATH),
    VAULT: path.join(process.cwd(), infrastructureConfig.VAULT_PATH)

}
export const INFRA_DIR_LIST = Object.values(REQUIRED_DIRECTORIES);
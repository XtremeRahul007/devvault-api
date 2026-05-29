import path from "node:path";

export const REQUIRED_DIRECTORIES = {
    STORAGE: path.join(process.cwd(), "storage"),
    LOGS: path.join(process.cwd(), "logs") 
}

export const INFRA_DIR_LIST = Object.values(REQUIRED_DIRECTORIES);
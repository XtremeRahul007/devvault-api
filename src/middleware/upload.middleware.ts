import multer from "multer";
import { infrastructureConfig } from "../core/configs/infrastructure.js";
import { randomUUID } from "node:crypto";
import path from "node:path";

const storage = multer.diskStorage({
    destination(_req, _file, callback) {
        callback(null, infrastructureConfig.FILES_PATH);
    },
    filename(_req, file, callback) {
        const fileId = randomUUID();

        const extension = path.extname(file.originalname);

        callback(null, `${fileId}${extension}`);
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: infrastructureConfig.MAX_FILE_SIZE
    }
})


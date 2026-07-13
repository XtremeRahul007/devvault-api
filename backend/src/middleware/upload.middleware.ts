import multer from "multer";
import { infrastructureConfig } from "../core/configs/infrastructure.js";
import { randomUUID } from "node:crypto";

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, infrastructureConfig.FILES_PATH);
  },
  filename(_req, _file, callback) {
    const fileId = randomUUID();

    callback(null, fileId);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: infrastructureConfig.MAX_FILE_SIZE
  }
})
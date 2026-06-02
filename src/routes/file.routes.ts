import express from "express";
import { deleteFile, downloadFile, uploadFile } from "../controllers/file.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);
router.get("/:id", downloadFile);
router.delete("/:id", deleteFile);

export default router;
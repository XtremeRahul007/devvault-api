import express from "express";
import { deleteFile, downloadFile, getAllUploads, renameUpload, uploadFile } from "../controllers/file.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/:id", downloadFile);
router.delete("/:id", deleteFile);
router.patch("/:id", renameUpload);
router.get("/", getAllUploads);

export default router;
import express, { Request, Response } from "express";
import { deleteFile, downloadFile, getAllUploads, getFileInfo, renameUpload, uploadFiles } from "../controllers/file.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.array("files"), uploadFiles);
router.get("/download/:id", downloadFile);
router.get("/info/:id", getFileInfo);
router.delete("/delete/:id", deleteFile);
router.patch("/:id", renameUpload);
router.get("/", getAllUploads);

export default router;
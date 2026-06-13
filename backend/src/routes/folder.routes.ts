import express from 'express';
import { createFolder, deleteFolder, getAllFolders, getFolderById, getFolderContent, renameFolder } from '../controllers/folder.controller.js';

const router = express.Router();

router.post("/", createFolder);
router.get("/", getAllFolders);
router.get("/:id", getFolderById);
router.delete("/:id", deleteFolder);
router.patch("/:id", renameFolder)
router.get("/content/:id", getFolderContent);

export default router;
import express from "express";
import { getVault, createVaultItem, deleteVaultItem, updateVaultItem, getAllVaultItem } from "../controllers/vault.controller.js";

const router = express.Router();

router.get("/:id", getVault);
router.get("/", getAllVaultItem);
router.post("/", createVaultItem);
router.delete("/:id", deleteVaultItem);
router.patch("/:id", updateVaultItem);

export default router;
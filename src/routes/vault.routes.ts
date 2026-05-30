import express from "express";
import { getVaultById, createVault, deleteVault, updateVault, getAllVaults } from "../controllers/vault.controller.js";

const router = express.Router();

router.get("/:id", getVaultById);
router.post("/", createVault);
router.delete("/:id", deleteVault);
router.patch("/:id", updateVault);
router.get("/", getAllVaults);

export default router;
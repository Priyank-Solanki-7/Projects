import express from "express";
import {
  createCombo,
  getAllCombos,
  getComboById,
  updateCombo,
  deleteCombo,
} from "../controller/combo.controller.js";

const router = express.Router();

router.post("/", createCombo);
router.get("/", getAllCombos);
router.get("/:id", getComboById);
router.put("/:id", updateCombo);
router.delete("/:id", deleteCombo);

export default router;

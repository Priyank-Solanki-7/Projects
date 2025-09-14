import express from "express";
import {
  createStaff,
  listStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../controller/Staff.Controller.js";

const router = express.Router();

router.post("/", createStaff);
router.get("/", listStaff);
router.get("/:id", getStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;

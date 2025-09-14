import express from "express";
import {
  createEmployee,
  getAllUser,
  getUserById,
  updateUser,
  deleteEmployee,
} from "../controller/employee.controller.js";

const router = express.Router();

router.post("/", createEmployee);
// controller exports getAllUser; expose it here as the GET / handler
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteEmployee);

export default router;

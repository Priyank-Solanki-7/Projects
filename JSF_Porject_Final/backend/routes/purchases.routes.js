import express from "express";
import {
  createPurchase,
  listPurchases,
  getPurchase,
  updatePurchase,
} from "../controller/Purchases.Controller.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/", listPurchases);
router.get("/:id", getPurchase);
router.put("/:id", updatePurchase);

export default router;

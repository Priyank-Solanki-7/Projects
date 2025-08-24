import express from "express";
import db from "../db.js";
import { ragister } from "../controller/AddUserController.js"; 

const router = express.Router();

router.post("/",ragister);

export default router;
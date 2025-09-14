import express from "express";
import db from "../db.js";
import { ragister } from "../controller/AddUser.Controller.js"; 

const router = express.Router();

router.post("/",ragister);

export default router;
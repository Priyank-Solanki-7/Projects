import express from "express";
import { login } from "../controller/Login.Controller.js";

const router = express.Router();

router.post("/", login);

export default router;

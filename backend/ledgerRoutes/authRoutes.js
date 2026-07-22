import express from "express";
import { login } from "../ledgerControllers/authController.js";

const router = express.Router();

router.post("/login", login);

export default router;

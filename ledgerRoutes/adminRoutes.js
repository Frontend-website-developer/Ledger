import { registerAdmin, loginAdmin, getAdminProfile } from "../ledgerControllers/adminController.js";
import protect from "../ledgerMiddleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/profile", protect, getAdminProfile);


export default router;
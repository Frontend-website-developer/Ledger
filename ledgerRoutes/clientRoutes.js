import express from "express";
import { clientRegister, clientLogin, getClientProfile } from "../ledgerControllers/clientController.js";
import { clientProtected } from "../ledgerMiddleware/clientAuthMiddleware.js";

const router = express.Router();


router.post("/register", clientRegister);
router.post("/login", clientLogin);

router.get("/profile", clientProtected, getClientProfile);

export default router;
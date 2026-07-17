import express from "express";
import { clientRegister, clientLogin, getClientProfile, getMyBalance, getClientBalance } from "../ledgerControllers/clientController.js";
import { clientProtected } from "../ledgerMiddleware/clientAuthMiddleware.js";
import protect from "../ledgerMiddleware/authMiddleware.js";
const router = express.Router();


router.post("/register", clientRegister);
router.post("/login", clientLogin);

router.get("/profile", clientProtected, getClientProfile);

router.get("/balance", clientProtected, getMyBalance);           // client apna dekhega
router.get("/:clientId/balance", protect, getClientBalance);   // admin kisi ka bhi dekhega


export default router;
import express from "express";
import { createPayment, updatePaymentStatus, getClientPayments, getPendingPayments } from "../ledgerControllers/paymentController.js";
import protect from "../ledgerMiddleware/authMiddleware.js";
import { clientProtected } from "../ledgerMiddleware/clientAuthMiddleware.js";

const router = express.Router();

router.post("/", clientProtected, createPayment);
router.get("/my", clientProtected, getClientPayments);

router.get("/pending", protect, getPendingPayments);

router.put("/:id", protect, updatePaymentStatus);

export default router;
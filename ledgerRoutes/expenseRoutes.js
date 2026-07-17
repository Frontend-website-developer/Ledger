import express from "express";
import {createExpense, updateExpense, getClientExpenses} from "../ledgerControllers/expenseController.js";
import protect from "../ledgerMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/client/:clientId", protect, getClientExpenses);
router.put("/:id", protect, updateExpense);

export default router;

import clientExpense from "../ledgerModels/expense.js";

const createExpense = async (req, res) => {
    const { amount, description, client } = req.body;

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }
    if (!client) {
        return res.status(400).json({ message: "Client is required" });
    }

    try {
        const expense = await clientExpense.create({ amount, description, client });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: "Failed to create expense" });
    }
};

const updateExpense = async (req, res) => {
    const { id } = req.params;

    if (req.body.amount !== undefined && (typeof req.body.amount !== "number" || req.body.amount <= 0)) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    try {
        const expense = await clientExpense.findByIdAndUpdate(id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: "Failed to update expense" });
    }
};

const getClientExpenses = async (req, res) => {
    const { clientId } = req.params;
    try {
        const expenses = await clientExpense.find({ client: clientId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
};

export { createExpense, updateExpense, getClientExpenses };
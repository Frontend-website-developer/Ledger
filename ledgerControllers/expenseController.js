import clientExpense from "../ledgerModels/expense.js";

const createExpense = async(req, res) =>{
    const {amount, description, client} = req.body;
    const expense = await clientExpense.create({amount, description, client});
    res.json(expense);
}

const updateExpense = async(req, res) => {
    const {id} = req.params;
    const expense = await clientExpense.findByIdAndUpdate(id, req.body, {new: true});
    res.json(expense);
}

const getClientExpenses = async(req, res) => {
    const {clientId} = req.params;
    const expenses = await clientExpense.find({client: clientId,});
    res.json(expenses);
}

export {createExpense, updateExpense, getClientExpenses};
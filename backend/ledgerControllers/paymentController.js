import Payment from "../ledgerModels/payment.js";

const createPayment = async(req, res) => {
    
    const {amount, description} = req.body;
    if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Amount must be a positive number" });
}
    const payment = await Payment.create({amount, description, client: req.clientId});
    res.json(payment);
}

const getClientPayments = async(req, res) => {
    const payments = await Payment.find({client: req.clientId});
    res.json(payments);
}

const getPendingPayments = async(req, res) => {
    const payments = await Payment.find({status: "pending"}).populate("client", "name");
    res.json(payments);
}

const updatePaymentStatus = async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    const payment = await Payment.findByIdAndUpdate(id, {status}, {new: true});
    res.json(payment);
}

const getClientPaymentsById = async (req, res) => {
    const {clientId} = req.params;
    const payments = await Payment.find({client: clientId});
    res.json(payments);
}

const createAdminPayment = async(req, res) => {
    const {amount, description, client} = req.body;
    if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Amount must be a positive number" });
}
    const payment = await Payment.create({amount, description, client, status: "approved"});
    res.json(payment);
}

export {createPayment, getClientPayments, getPendingPayments, updatePaymentStatus, getClientPaymentsById, createAdminPayment}
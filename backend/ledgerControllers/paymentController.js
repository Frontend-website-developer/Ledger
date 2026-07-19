import Payment from "../ledgerModels/payment.js";

const createPayment = async(req, res) => {
    const {amount, description} = req.body;
    const payment = await Payment.create({amount, description, client: req.clientId});
    res.json(payment);
}

const getClientPayments = async(req, res) => {
    const payments = await Payment.find({client: req.clientId});
    res.json(payments);
}

const getPendingPayments = async(req, res) => {
    const payments = await Payment.find({status: "pending"});
    res.json(payments);
}

const updatePaymentStatus = async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
    const payment = await Payment.findByIdAndUpdate(id, {status}, {new: true});
    res.json(payment);
}

export {createPayment, getClientPayments, getPendingPayments, updatePaymentStatus}
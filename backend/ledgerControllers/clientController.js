import bcrypt from "bcrypt";
import Client from "../ledgerModels/client.js";
import Expense from "../ledgerModels/expense.js";
import Payment from "../ledgerModels/payment.js";
import jwt from "jsonwebtoken";

const clientRegister = async(req, res) => {
    const {name, email, phone, country, city, address, postalCode, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await Client.create({name, email, phone, country, city, address, postalCode, password: hashedPassword});
    res.json(client);
}

const clientLogin = async(req, res) => {
    const {email, password} = req.body;
    const client = await Client.findOne({email});
    if(!client){
        res.status(401).json({message: "Client not found"});
        return;
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if(!isMatch){
        res.status(401).json({message: "Invalid Password"});
        return;
    }
    const token = jwt.sign({id: client._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    res.json({token})
}

const getAllClients = async(req, res) => {
    const clientList = await Client.find().select("-password");
    res.json(clientList);
}

const getClientProfile = async(req, res) => {
    const client = await Client.findById(req.clientId).select("-password");
    res.json(client);
}

const calculateBalance = async (clientId) => {
    const expenses = await Expense.find({client: clientId});
    const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

    const payments = await Payment.find({client: clientId, status: "approved"});
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    return {totalExpense, totalPaid, balance: totalExpense - totalPaid};
};


const getMyBalance = async (req, res) => {
    const balance = await calculateBalance(req.clientId);
    res.json(balance);
}

const getClientBalance = async (req, res) => {
    const {clientId} = req.params;
    const balance = await calculateBalance(clientId);
    res.json(balance)
}

const getClientById = async (req, res) => {
    const {clientId} = req.params;
    const client = await Client.findById(clientId).select("-password");
    res.json(client);
}

export {clientRegister, clientLogin, getAllClients, getClientProfile, getMyBalance, getClientBalance, getClientById}


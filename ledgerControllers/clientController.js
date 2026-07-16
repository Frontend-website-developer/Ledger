import bcrypt from "bcrypt";
import Client from "../ledgerModels/client.js";
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

const getClientProfile = async(req, res) => {
    const client = await Client.findById(req.clientId).select("-password");
    res.json(client);
}

export {clientRegister, clientLogin, getClientProfile}


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../ledgerModels/admin.js";
import Client from "../ledgerModels/client.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ token, role: "admin" });
    }

    const client = await Client.findOne({ email });
    if (client) {
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ token, role: "client" });
    }

    return res.status(404).json({ message: "User not found" });
};

export { login };

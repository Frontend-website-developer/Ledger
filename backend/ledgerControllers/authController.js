import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
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

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    const admin = await Admin.findOne({email});
    if(admin){
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await admin.save();

    console.log(`Reset link: http://localhost:5173/reset-password/${rawToken}`);
    return res.json({ message: "Reset link sent" });
}

const client = await Client.findOne({email});
if(client){
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    client.resetPasswordToken = hashedToken;  
    client.resetPasswordExpires = Date.now() + 15 * 60 * 1000; 
    await client.save();                

    console.log(`Reset link: http://localhost:5173/reset-password/${rawToken}`);
    return res.json({ message: "Reset link sent" });
}

return res.json({ message: "Reset link sent" });
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const admin = await Admin.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (admin) {
        admin.password = await bcrypt.hash(password, 10);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();
        return res.json({ message: "Password reset successful" });
    }

    const client = await Client.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (client) {
        client.password = await bcrypt.hash(password, 10);
        client.resetPasswordToken = undefined;
        client.resetPasswordExpires = undefined;
        await client.save();
        return res.json({ message: "Password reset successful" });
    }

    return res.status(400).json({ message: "Invalid or expired token" });
};

export { login, forgotPassword, resetPassword };

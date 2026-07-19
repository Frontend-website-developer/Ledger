import bcrypt from "bcrypt";
import Admin from "../ledgerModels/admin.js";
import jwt from "jsonwebtoken";

const registerAdmin = async(req, res) => {
    const {name, email, phone, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({name, email, phone, password: hashedPassword });
    res.json(admin);
}

const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    const admin = await Admin.findOne({email});
    if(!admin){
        res.status(404).json({message: "Admin not found"});
        return;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch){
        res.status(401).json({message: "Invalid Password"})
        return;
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
}

const getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.adminId).select("-password");
    res.json(admin);
};

export { registerAdmin, loginAdmin, getAdminProfile };
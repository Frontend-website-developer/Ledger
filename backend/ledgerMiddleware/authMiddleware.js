import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(404).json({message: "No token provided"});
        return;
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({message: "Invalid or expired token"});
        return;
    
    }
};

export default protect;
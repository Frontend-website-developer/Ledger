import jwt from "jsonwebtoken"

const clientProtected = async(req, res, next ) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message: "Token not valid"});
            return;
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.clientId = decoded.id;
        next();
    }
    catch(err){
        res.status(401).json({message: "Invalid or expired token"})
    }
}

export {clientProtected}
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // debugger ;
    const token = req.header("Authorization") ;

    console.log("Token received:", token);

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }   

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        req.user = decoded; // Attach user info to request object..

        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = authMiddleware;

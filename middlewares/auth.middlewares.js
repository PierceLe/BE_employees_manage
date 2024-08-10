const jwt = require("jsonwebtoken");
const database = require('../database/mysql.js');

const authMiddleware = async (req, res, next) => {
    let token = null;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } 

    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await database.getUserById(decoded.id);
        if (user.length === 0) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = user[0];
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: 'Unauthorized 1'})
    }
}


const authorizationMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: 'Forbidden'})
    }
    next()
}


module.exports = {
    authMiddleware,
    authorizationMiddleware
}
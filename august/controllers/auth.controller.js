const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require('../database/mysql.js');

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await database.findUsersByEmail(email);
        if (user.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }
        const correctPassword = await bcrypt.compare(password, user[0].password);
        if (!correctPassword) {
            return res.status(401).json({message: 'Password is incorrect'})
        }

        let token = jwt.sign({
            id: user[0].id,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 20000
        }, process.env.JWT_SECRET);  
    
        res.json({
            code: 200,
            data: {
                access_token: token
            },
            error: null
        })
    }
    catch (err) {
        res.json({
            code: 500,
            data: null,
            error: err.message
        })
    }
}

const signup = async (req, res) => {
    let { fullname, gender, email, phone, age, address, password } = req.body;
    try {
        if (!fullname){
            return res.status(400).json({
                code: 400,
                data: null,
                error: "fullname is required"
            })
        }
        else if (!age){
            return res.status(400).json({
                code: 400,
                data: null,
                error: "age is required"
            })
        }
        else if (!gender){
            return res.status(400).json({
                error: "gender is required"
            }) 
        }
        else if (!address){
            return res.status(400).json({
                error: "address is required"
            }) 
        }
        else if (!phone){
            return res.status(400).json({
                error: "phone is required"
            }) 
        }
        else if (!email){
            return res.status(400).json({
                error: "email is required"
            }) 
        }
        else if (!password) {
            return res.status(400).json({
                error: "password is required"
            }) 
        }

        const user = await database.findUsersByEmail(email);
        if (user.length > 0) {
            return res.status(400).json({
                error: "Email is already exists"
            })
        }

        password = await bcrypt.hash(password, 12);
        await database.insertUser(email, password, fullname, gender, phone, age, address);
        
        res.json({
            code: 201,
            data: {},
            error: null
        })
    }
    catch (err) {
        res.json({
            code: 500,
            data: null,
            error: err
        })
    }
}

module.exports = {
    signin,
    signup
}
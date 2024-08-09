const database = require('../database/mysql.js');

const getAll = async (req, res) => {
    try {
        console.log("api get all", req.user);
        const { q }= req.query;
        let data = await database.getAllUsers(q);
        res.json({
            code: 200,
            data: data,
            error: null
        });
    }
    catch (err) {
        res.status(500).json({
            code: 500,
            data: null,
            error: err.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const {id } = req.query;
        const data = await database.getUserById(id);
        res.json({
            code: 200,
            data: data,
            error: null
        });
    }
    catch (err) {
        res.status(500).json({
            code: 500,
            data: null,
            error: err.message
        });
    }
}

const updateById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        let {fullname, gender, email, phone, age, address, password} = req.body;
        password = await bcrypt.hash(user.password, 12);
        const data = database.updateUser(id, fullname, gender, email, phone, age, address, password);
        res.json({
            code: 200,
            data: data,
            error: null
        })
    }   
    catch (err) {
        res.json({
            code: 500,
            data: data,
            error: err
        })
    }
}

const deleteById = async (req,res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const data = await database.deleteUser(id);
        res.json({
            code: 200,
            data: data,
            error: null
        })
    }
    catch (err) {
        res.json({
            code: 500,
            data: data,
            error: err
        })
    }
}

module.exports = {
    getAll,
    getById,
    updateById,
    deleteById
}
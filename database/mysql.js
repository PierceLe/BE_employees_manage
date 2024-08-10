const mysql = require('mysql2/promise');

let connection = null;

const connect = async() => {
    connection = await mysql.createConnection(process.env.MYSQL_URI);
}

const createTableUser = () => {
    return connection.query(
        `CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            fullname VARCHAR(255),
            gender VARCHAR(255),
            email VARCHAR(255),
            phone INT,
            age INT,
            address VARCHAR(255),
            role VARCHAR(255) DEFAULT 'user',
            password VARCHAR(255)
        )`
    );
}

const getAllUsers = async(q) => {
    let query = "SELECT id, fullname, gender, email, phone, age, address FROM users";

    if (q) {
        query += ` WHERE email = '${q}' OR phone = '${q}'`;
    }
    const users = await connection.query(query);
    return users[0];
};

const findUsersByEmail = async (email) => {
    const user = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return user[0];
}

const getUserById = async (id) => {
    const user = await connection.query("SELECT id, role FROM users WHERE id = ?", [id]);
    return user[0];
}

const insertUser = (email, password, fullname, gender, phone, age, address, ) => {
    const query = "INSERT INTO users (fullname, gender, email, phone, age, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [fullname, gender, email, phone, age, address, password];
    return connection.query(query, values);
}

const updateUser = (id, fullname, gender, email, phone, age, address, password, connection = defaultConnection) => {
    const query = "UPDATE Users SET fullname = ?, gender = ?, email = ?, phone = ?, age = ?, address = ?, password = ? WHERE id = ?";
    const values = [fullname, gender, email, phone, age, address, password];
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) return reject(err);
            return resolve("Update user successfully");
        })
    })
};

const deleteUser = (id) => {
    const query = "DELETE FROM Users WHERE id = ?";
    const values = [id];
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) return reject(err);
            return resolve("Delete user successfully");
        })
    })
}


module.exports = {
    connect,
    createTableUser,
    getAllUsers,
    findUsersByEmail,
    getUserById,
    updateUser,
    deleteUser,
    insertUser
}



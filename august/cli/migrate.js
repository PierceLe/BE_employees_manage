const mysql = require('../database/mysql');
require('dotenv').config()

const migrate = async() => {
    const args = process.argv;
    
    if (args.length < 3) {
        console.log('\x1b[31m%s\x1b[0m', 'Please provide a valid method');
        return;
    }

    await mysql.connect();
    const method = args[2];
    if (method === 'up') {
        await mysql.createTableUser()
    } else {
        // down();
    }
}

migrate()
    .then(() => {
        console.log('Migration completed');
        process.exit(0)
    })
    .catch((err) => {
        console.log('Migration failed', err);
        process.exit(0)
    });
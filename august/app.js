const express = require("express");
require('dotenv').config();
const app = express();
const port = 3000;
const route = require('./routes');
const mysql = require('./database/mysql');


mysql.connect();

app.use(express.json());
app.use('/api/v1', route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})



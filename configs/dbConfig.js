const mysql = require('mysql');

require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// pool.query('SELECT * FROM paciente WHERE id=5', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results[0]);
// });

module.exports = pool;
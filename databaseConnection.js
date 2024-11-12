// Database connection file...

const mysql = require('mysql2');

const database = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'irctc'
});

const datapool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'irctcpool'
})

module.exports = {database, datapool};


/*
    Default Tables - trains, timings
*/

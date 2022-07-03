const mysql = require('mysql')
const config = require('../app-config.json')

const db = mysql.createConnection({
    host: config.db.host,
    database: config.db.database,
    user: config.db.user,
    port: config.db.port,
    password: config.db.password
})

// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db;
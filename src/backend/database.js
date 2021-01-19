const mysql = require('mysql');
const util = require('util')
const dotenv = require('dotenv');

dotenv.config({path: 'config/config.env'});

const dbPool = mysql.createPool({
	host     : process.env.HOST,
	user     : "root",
	password : process.env.PASSWORD,
	database : process.env.DATABASE,
});


dbPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
});

// Promisify for Node.js async/await.
dbPool.query = util.promisify(dbPool.query);
module.exports.dbPool = dbPool;
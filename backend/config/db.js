const mysql2 = require('mysql2');
require('dotenv').config();

const pool = mysql2.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    port:     process.env.DB_PORT     || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'employee_management_db',
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0,
});

const promisePool = pool.promise();

promisePool.getConnection()
    .then(conn => {
        console.log('✅ MySQL connected successfully');
        conn.release();
    })
    .catch(err => {
        console.error('❌ MySQL connection failed:', err.message);
    });

module.exports = promisePool;

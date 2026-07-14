const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rutuja123",
  database: "employee_db",
});

module.exports = db.promise();
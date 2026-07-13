const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rutuja123",          // Put your MySQL password here if you have one
  database: "employee_db", // Replace with your DB name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Dashboard Backend Running...");
});

// Dashboard API
app.get("/api/dashboard/stats", (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS totalEmployees
    FROM employee;
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
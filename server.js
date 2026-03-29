const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sparctrack"
});

app.get("/api/interns", (req, res) => {
  db.query("SELECT * FROM interns", (err, data) => {
    if (err) return res.send(err);
    res.json(data);
  });
});

app.listen(5000, () => console.log("Server running"));
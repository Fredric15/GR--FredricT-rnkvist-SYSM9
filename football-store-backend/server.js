const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend för fotbollsbutiken är igång! ⚽");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});

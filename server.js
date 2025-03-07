//Require Dependecies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//Build Route
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Listen Port 3000");
});

//Require Dependecies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Nfl = require("./models/nfl.js");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//middleware
app.use(express.urlencoded({ extended: false }));

//Build Route... This leads to Home Page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//Takes us to our form page
app.get("/teams/new", (req, res) => {
  res.render("teams/new.ejs");
});

// This post the information entered by the user into our database
app.post("/teams", async (req, res) => {
  if (req.body.isPlayoffContender === "on") {
    req.body.isPlayoffContender = true;
  } else {
    req.body.isPlayoffContender = false;
  }

  await Nfl.create(req.body);
  console.log(req.body);
  res.redirect("/teams/new");
});

app.listen(3000, () => {
  console.log("Listen Port 3000");
});

//Require Dependecies
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Nfl = require("./models/nfl.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")));


//Build Route... This leads to Home Page
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//Takes us to our form page
app.get("/teams/new", (req, res) => {
  res.render("teams/new.ejs");
});

// This post the information entered by the user into our database. We are using the Create in CRUD
app.post("/teams", async (req, res) => {
  if (req.body.isPlayoffContender === "on") {
    req.body.isPlayoffContender = true;
  } else {
    req.body.isPlayoffContender = false;
  }
  
  //Create the data in our database
  await Nfl.create(req.body);
  console.log(req.body);

  // redirect tells the client to navigate to new URL path
  res.redirect("/teams");
});

//Create index route -- this list all the teams
app.get("/teams", async (req, res) => {
  const allTeams = await Nfl.find();

  //Categorize by conference
  const categorizedTeams = {
    AFC: allTeams.filter((team) => team.conference.toUpperCase() === "AFC"),
    NFC: allTeams.filter((team) => team.conference.toUpperCase() === "NFC"),
  };

  res.render("teams/index.ejs", { categorizedTeams });
});

//Create Show route. This will display detailed info about specific items
app.get("/teams/:teamId", async (req, res) => {
  const findTeam = await Nfl.findById(req.params.teamId);
  res.render("teams/show.ejs", { team: findTeam });
});

//Create DELETE route
app.delete("/teams/:teamId", async (req, res) => {
  await Nfl.findByIdAndDelete(req.params.teamId);
  res.redirect("/teams");
});

//Create edit route
app.get("/teams/:teamId/edit", async (req, res) => {
  const findTeam = await Nfl.findById(req.params.teamId);
  res.render("teams/edit.ejs", { team: findTeam });
});

//Create update route
app.put("/teams/:teamId", async (req, res) => {
  if (req.body.isPlayoffContender === "on") {
    req.body.isPlayoffContender = true;
  } else {
    req.body.isPlayoffContender = false;
  }
//updates the team in the database
  await Nfl.findByIdAndUpdate(req.params.teamId, req.body);
// Redirect users to Teams page and shows updates
  res.redirect(`/teams/${req.params.teamId}`);
});

app.listen(3000, () => {
  console.log("Listen Port 3000");
});

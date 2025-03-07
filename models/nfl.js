//Requiring Mongoose
const mongoose = require("mongoose");

//Creating nfl schema
const nflSchema = new mongoose.Schema({
  team: String,
  conference: String,
  division: String,
  isPlayoffContender: Boolean,
});

//Connecting schema to a model
const Nfl = mongoose.model("Nfl", nflSchema);

//Exporting the model
module.exports = Nfl;

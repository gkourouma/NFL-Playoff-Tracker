const mongoose = require("mongoose");

const nflSchema = new mongoose.Schema({
  team: String,
  isPlayoffContender: Boolean,
});

const Nfl = mongoose.model("Nfl", nflSchema);

module.export = Nfl;

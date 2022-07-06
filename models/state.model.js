const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  country_id: {
    type: String,
  },
  country_code: {
    type: String,
  },
  country_name: {
    type: String,
  },
  state_code: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

const State = new mongoose.model("State", stateSchema);
module.exports = State;

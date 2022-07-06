const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  state_id: {
    type: String,
  },
  state_name: {
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
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  wikiDataId: {
    type: String,
  },
});

const City = new mongoose.model("City", citySchema);
module.exports = City;

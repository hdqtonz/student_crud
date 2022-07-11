const Country = require("../models/country.model");
const State = require("../models/state.model");
const City = require("../models/city.model");

//----------Get All Country-----------//
const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).send(countries);
  } catch (e) {
    res.status(500).send(e);
  }
};
//----------Get All State-----------//
const getAllState = async (req, res) => {
  try {
    if (req.query.country_id) {
      let id = req.query.country_id;
      const states = await State.find({ country_id: id });
      res.status(200).send(states);
    } else {
      const states = await State.find();
      res.status(200).send(states);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
// ---------Get All City-----------//
const getAllCity = async (req, res) => {
  let id = req.query.state_id;
  try {
    if (req.query.state_id) {
      const cities = await City.find({ state_id: id });
      res.status(200).send(cities);
    } else {
      const cities = await City.find();
      res.status(200).send(cities);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getAllCountry,
  getAllState,
  getAllCity,
};

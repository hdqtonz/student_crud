const Country = require("../models/country.model");
const State = require("../models/state.model");
const City = require("../models/city.model");

const getAllCountry = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).send(countries);
  } catch (e) {
    res.status(500).send(e);
  }
};
const getAllState = async (req, res) => {
  let id = req.query.country_id;
  try {
    const states = await State.find({ country_id: id });
    res.status(200).send(states);
  } catch (e) {
    res.status(500).send(e);
  }
};
const getAllCity = async (req, res) => {
  let id = req.query.state_id;
  try {
    const cities = await City.find({ state_id: id });
    res.status(200).send(cities);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getAllCountry,
  getAllState,
  getAllCity,
};

const router = require("express").Router();
const cscController = require("../controllers/country-state-city.controller");

router.get("/countries", cscController.getAllCountry);
router.get("/states", cscController.getAllState);
router.get("/cities", cscController.getAllCity);

module.exports = router;

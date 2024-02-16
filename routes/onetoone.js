const expres = require("express");
const { addOwner, addHouse, getOwnerAndHouseDetails } = require("../controllers/onetooneController/onetooneController");
const onetooneRoutes = expres.Router();

onetooneRoutes.route("/add-owner").post(addOwner);
onetooneRoutes.route("/add-house").post(addHouse);
onetooneRoutes.route("/find-house/:name").post(getOwnerAndHouseDetails);

module.exports = onetooneRoutes;
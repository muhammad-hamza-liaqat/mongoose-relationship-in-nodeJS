const expres = require("express");
const { addOwner, addHouse } = require("../controllers/onetooneController/onetooneController");
const onetooneRoutes = expres.Router();

onetooneRoutes.route("/add-owner").post(addOwner);
onetooneRoutes.route("/add-house").post(addHouse);

module.exports = onetooneRoutes
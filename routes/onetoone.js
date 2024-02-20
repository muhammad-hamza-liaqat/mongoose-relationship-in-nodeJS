const expres = require("express");
const { addOwner, addHouse, getHouseByOwner } = require("../controllers/onetooneController/onetooneController");
const { addHouseLambda } = require("../controllers/lambdaFunction/onetooneControllerLambda");
const onetooneRoutes = expres.Router();
onetooneRoutes.route("/add-owner").post(addOwner);
onetooneRoutes.route("/add-house").post(addHouseLambda);
onetooneRoutes.route("/find-house/:name").post(getHouseByOwner);

module.exports = onetooneRoutes;
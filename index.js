const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server
app.listen(3000, () => {
  console.log("server running at http://localhost:3000/");
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./database/connection");


// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes 
const onetooneRoutes = require("./routes/onetoone");
app.use("/1-1",onetooneRoutes);

// server
app.listen(3000, () => {
  console.log("server running at http://localhost:3000/");
});

const mongo = require("mongoose");
mongo
  .connect("mongodb://localhost:27017/relationships")
  .then(() => {
    console.log("MongoDB connected to privateChat!");
  })
  .catch((error) => {
    console.log("MongoDB not connected! error: ", error);
  });
module.exports = mongo;
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    ownerName:{
        type: String,
        required: true
    }
});

const ownerModel = mongoose.model("ownerModel", ownerSchema);

module.exports = ownerModel;
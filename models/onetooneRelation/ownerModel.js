const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    ownerName:{
        type: String,
        required: true
    }
});

const ownerModel = mongoose.model("Owner", ownerSchema);

module.exports = ownerModel;
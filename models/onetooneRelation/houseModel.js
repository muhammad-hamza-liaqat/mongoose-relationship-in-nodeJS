const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    houseNumber:{
        type: String,
        required: true
    },
    houseType:{
        type: String,
        required: true
    },
    houseAddress:{
        type: String,
        required: true
    },
    ownerName:{
        type: mongoose.Schema.Types.String,
        ref: "Owner"
    }
});

const houseModel = mongoose.model("House", houseSchema);

module.exports = houseModel;
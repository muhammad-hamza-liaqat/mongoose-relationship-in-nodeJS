const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    ownerName:{
        type: String,
        required: true
    },
    // relationship
    house:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "House"
    }
});

const ownerModel = mongoose.model("ownerModel", ownerSchema);

module.exports = ownerModel;
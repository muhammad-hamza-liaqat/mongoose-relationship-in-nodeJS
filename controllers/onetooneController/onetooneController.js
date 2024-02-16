const ownerModel = require("../../models/onetooneRelation/ownerModel");
const houseModel = require("../../models/onetooneRelation/houseModel");

const addOwner = async (req, res) => {
  const { ownerName } = req.body;
  if (!ownerName) {
    return res.status(400).json({ message: " ownerName not found!" });
  }
  try {
    const newOwner = await ownerModel.create({ ownerName });
    await newOwner.save();
    console.log("owner created", newOwner);
    return res.status(201).json({ message: "new owner added", newOwner });
  } catch (error) {
    console.log("addOnwer-controller error", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error });
  }
};

const addHouse = async (req, res) => {
    const { houseNumber, houseType, houseAddress, ownerName } = req.body;
    if (!houseNumber || !houseType || !houseAddress) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    try {
        // Check if owner already has a house
        const existingHouse = await houseModel.findOne({ ownerName });
        if (existingHouse) {
            return res.status(400).json({ message: "One owner can have only one house!" });
        }

        const newHouse = await houseModel.create({
            houseNumber,
            houseType,
            houseAddress,
            ownerName
        });
        console.log("House created", newHouse);
        return res.status(201).json({ message: "New house added", newHouse });
    } catch (error) {
        console.log("AddHouse-controller error", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};


module.exports = { addOwner, addHouse };

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
        return res.status(400).json({ message: "All fields (houseNumber, houseType, houseAddress) are required!" });
    }
    try {
        let newHouse;
        // If ownerName is available, find the owner and establish one-to-one relationship
        if (ownerName) {
            const owner = await ownerModel.findOne({ ownerName });
            if (!owner) {
                return res.status(404).json({ message: "Owner not found" });
            }

            // Check if the owner already has a house
            const existingHouse = await houseModel.findOne({ owner: owner._id });
            if (existingHouse) {
                return res.status(400).json({ message: "One owner can have only one house" });
            }

            newHouse = await houseModel.create({
                houseNumber,
                houseType,
                houseAddress,
                owner: owner._id // Using the ObjectId of the owner
            });
        } else {
            // If ownerName is not available, create the house without any relationship
            newHouse = await houseModel.create({
                houseNumber,
                houseType,
                houseAddress,
            });
        }

        console.log("House created", newHouse);
        return res.status(201).json({ message: "New house added", newHouse });
    } catch (error) {
        console.log("AddHouse-controller error", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const getHouseByOwner = async (req, res) => {
    const ownerName = req.params.name;
    console.log("Owner Name:", ownerName); // Add this line for logging

    try {
        const owner = await ownerModel.findOne({ ownerName });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // Fetch house information for the owner
        const house = await houseModel.findOne({ owner: owner._id });
        if (!house) {
            return res.status(404).json({ message: "House not found for this owner" });
        }

        console.log("House found", house);
        return res.status(200).json({
            message: "House information found",
            ownerName: owner.ownerName,
            ownerID: owner._id,
            house
        });
    } catch (error) {
        console.log("GetHouseByOwner-controller error", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};




module.exports = { addOwner, addHouse, getHouseByOwner };

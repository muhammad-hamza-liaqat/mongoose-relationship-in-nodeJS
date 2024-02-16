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
            const existingHouse = await houseModel.findOne({ ownerName: owner._id });
            if (existingHouse) {
                return res.status(400).json({ message: "One owner can have only one house" });
            }

            newHouse = await houseModel.create({
                houseNumber,
                houseType,
                houseAddress,
                ownerName: owner._id // Using the ObjectId of the owner
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

const getOwnerAndHouseDetails = async (req, res) => {
    try {
        const name = req.params.name;

        // Aggregate query to join Owner and House collections
        const result = await ownerModel.aggregate([
            {
                $match: { ownerName: name } // Filter by ownerName
            },
            {
                $lookup: {
                    from: "houses", // Name of the House collection
                    localField: "_id", // Field in the Owner collection
                    foreignField: "owner", // Field in the House collection
                    as: "houseDetails" // Alias for the joined documents
                }
            }
        ]);

        // Check if any result found
        if (result.length === 0) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // Extract owner and house details from the result
        const { _id, ownerName, houseDetails } = result[0];

        return res.status(200).json({ owner: { _id, ownerName }, houseDetails });
    } catch (error) {
        console.log("GetOwnerAndHouseDetails-controller error", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};









module.exports = { addOwner, addHouse, getOwnerAndHouseDetails };

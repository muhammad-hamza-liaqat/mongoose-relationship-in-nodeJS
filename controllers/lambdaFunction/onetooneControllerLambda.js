const houseModel = require("../../models/onetooneRelation/houseModel");
const ownerModel = require("../../models/onetooneRelation/ownerModel");


exports.addHouseLambda = async (event) => {
    try {
        // Parse the event body as JSON
        const body = JSON.parse(event.body);

        // Destructure the properties from the parsed JSON object
        const { houseNumber, houseType, houseAddress, ownerName } = body;

        // Validate the presence of required fields
        if (!houseNumber || !houseType || !houseAddress) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields (houseNumber, houseType, houseAddress) are required!" })
            };
        }

        // Check if ownerName is provided
        if (ownerName) {
            // Find the owner in the database
            const owner = await ownerModel.findOne({ ownerName });

            // If owner is not found, return a 404 response
            if (!owner) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: "Owner not found" })
                };
            }

            // Check if the owner already has a house
            const existingHouse = await houseModel.findOne({ owner: owner._id });
            if (existingHouse) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: "One owner can have only one house" })
                };
            }

            // Create a new house with the owner's ID
            const newHouse = await houseModel.create({
                houseNumber,
                houseType,
                houseAddress,
                owner: owner._id
            });

            console.log("House created", newHouse);

            // Return a success response
            return {
                statusCode: 201,
                body: JSON.stringify({ message: "New house added", newHouse })
            };
        } else {
            // If ownerName is not provided, create a house without an owner
            const newHouse = await houseModel.create({
                houseNumber,
                houseType,
                houseAddress,
            });

            console.log("House created", newHouse);

            // Return a success response
            return {
                statusCode: 201,
                body: JSON.stringify({ message: "New house added", newHouse })
            };
        }
    } catch (error) {
        // Handle any errors during parsing or execution
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};

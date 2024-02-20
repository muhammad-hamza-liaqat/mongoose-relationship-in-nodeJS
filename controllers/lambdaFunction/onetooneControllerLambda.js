const houseModel = require("../../models/onetooneRelation/houseModel");
const ownerModel = require("../../models/onetooneRelation/ownerModel");


exports.addHouseLambda = async (event) => {
    try {
        // Parse the event body as JSON
        const body = JSON.parse(event.body || '{}');

        // Destructure the properties from the parsed JSON object
        const { houseNumber, houseType, houseAddress, ownerName } = body;

        // Validate the presence of required fields
        if (!houseNumber || !houseType || !houseAddress) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields (houseNumber, houseType, houseAddress) are required!" })
            };
        }

        // Rest of your logic here...

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Lambda function executed successfully" })
        };
    } catch (error) {
        // Handle any errors during parsing or execution
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" })
        };
    }
};


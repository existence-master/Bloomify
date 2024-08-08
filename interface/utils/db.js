import mongoose from "mongoose";

// Connection function
const connect = async () => {
	// Check if there's an existing connection and if it's ready
	if (mongoose.connection?.readyState === 1) {
		console.log("Already connected to MongoDB.");
		return; // If connected, return early
	}

	try {
		// Connect to MongoDB with connection options
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connection to MongoDB established");
	} catch (error) {
		throw new Error(`Failed to connect to MongoDB. ${error}`);
	}
};

export default connect;

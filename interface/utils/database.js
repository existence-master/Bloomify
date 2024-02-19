import mongoose from "mongoose"

// Flag to track if MongoDB is already connected
let isConnected = false

// Function to connect to MongoDB
export const connectToDB = async () => {
    // Set strict query mode for mongoose
    mongoose.set("strictQuery", true)

    // Check if already connected
    if (isConnected) {
        console.log("MongoDB is already connected");
        return
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "bloomify-development",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Update isConnected flag
        isConnected = true
        console.log("MongoDB connected")
    }
    
    catch (error)
    {
        // Log any errors that occur during connection
        console.log(error)
    }
}
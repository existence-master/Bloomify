import mongoose from "mongoose";
import connect from "@utils/db";

const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            unique: true,
            required: false
        },
        university: {
            type: String,
            required: false,
        },
        chat: {
            type: Schema.Types.ObjectId, // Reference to the Chat model
            ref: 'Chat',
            required: false, // This can be optional, depending on use-case
        },
    },
    { timestamps: true }
);

await connect()

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";
import connect from "@utils/db";

const { Schema, model, models } = mongoose;

async function run() {
    await connect()
  }

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

run()

const User = models.User || model("User", userSchema);

export default User;
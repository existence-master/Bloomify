import mongoose from 'mongoose';

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
            required: true
        },
        university: {
            type: String,
            required: true,
        },
        chat: {
            type: Schema.Types.ObjectId, // Reference to the Chat model
            ref: 'Chat',
            required: false, // This can be optional, depending on use-case
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

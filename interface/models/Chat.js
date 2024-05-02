import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// Define the Chat Schema
const chatSchema = new Schema(
    {
        degree: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        chatHistory: [{
            type: Schema.Types.ObjectId,
            ref: 'PairedMessage', // Referencing the PairedMessage model
        }],
    },
    { timestamps: true }
);

const Chat = models.Chat || model('Chat', chatSchema);

export default Chat;
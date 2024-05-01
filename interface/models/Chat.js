import connect from '@utils/db';
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

async function run() {
    await connect()
  }

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

run()

const Chat = models?.Chat || model('Chat', chatSchema);

export default Chat;
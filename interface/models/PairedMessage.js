import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the schema with a dynamic `input` field
const pairedMessageSchema = new Schema(
    {
        input: {
            type: String, // This allows for dynamic data types
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const PairedMessage = models.PairedMessage || model("PairedMessage", pairedMessageSchema);

export default PairedMessage;
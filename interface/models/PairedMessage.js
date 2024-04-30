import connect from "@utils/db";
import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema with a dynamic `input` field
const pairedMessageSchema = new Schema(
    {
        input: {
            type: Schema.Types.Mixed, // This allows for dynamic data types
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

await connect()

const PairedMessage = mongoose.models.PairedMessage || mongoose.model("PairedMessage", pairedMessageSchema);

export default PairedMessage;
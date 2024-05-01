import connect from "@utils/db";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

async function run() {
    await connect()
  }

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

run()

const PairedMessage = models?.PairedMessage || model("PairedMessage", pairedMessageSchema);

export default PairedMessage;
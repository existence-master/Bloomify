import mongoose from "mongoose";

const { Schema } = mongoose;

const pairedMessageSchema = new Schema(
    {
        input: {
            type: Schema.Types.ObjectId,
            refPath: "inputModel", // This allows for referencing multiple models
            required: true,
        },
        inputModel: {
            type: String,
            enum: ["ClassificationInput", "SuggestionInput"], // Valid model references
            required: true,
        },
        response: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure unique indexes on the chat history
const PairedMessage = mongoose.models.PairedMessage || mongoose.model("PairedMessage", pairedMessageSchema);

export default PairedMessage;

import mongoose from "mongoose";

const { Schema } = mongoose;

const suggestionInputSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        desired_level: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const SuggestionInput = mongoose.models.SuggestionInput || mongoose.model("SuggestionInput", suggestionInputSchema);
export default SuggestionInput;

import mongoose from "mongoose";

const { Schema } = mongoose;

const classificationInputSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const ClassificationInput = mongoose.models.ClassificationInput || mongoose.model("ClassificationInput", classificationInputSchema);
export default ClassificationInput;

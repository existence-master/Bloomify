import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for the syllabus
const syllabusSchema = new Schema({
    unit: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

// Define the schema for the marking scheme
const markingSchemeSchema = new Schema({
    marksPerUnit: {
        type: Number,
        required: true
    },
    mainQuestionsPerUnit: {
        type: Number,
        required: true
    },
    subQuestionsPerMainQuestion: {
        type: Number,
        required: true
    },
    marksPerMainQuestion: {
        type: Number,
        required: true
    }
});

// Create the main schema with references to the sub-schemas
const generationInputSchema = new Schema(
    {
        syllabus: {
            type: [syllabusSchema], // an array of syllabus units
            required: true
        },
        markingScheme: {
            type: markingSchemeSchema, // an object defining the marking scheme
            required: true
        },
        averageBloomsScore: {
            type: Number,
            min: 1,
            max: 6,
            required: true
        }
    },
    { timestamps: true }
);

// Create the model for the schema
const GenerationInput = mongoose.models.GenerationInput || mongoose.model("GenerationInput", generationInputSchema);

export default GenerationInput;
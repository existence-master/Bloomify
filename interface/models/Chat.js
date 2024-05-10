import mongoose from 'mongoose'; // Importing the mongoose library for MongoDB

const { Schema, model, models } = mongoose; // Destructuring Schema, model, and models from mongoose

// Define the schema for the Chat collection
const chatSchema = new Schema(
  {
	title: {
	  type: String, // Data type for the title field
	  required: false, // Title is not required
	},
	degree: {
	  type: String, // Data type for the degree field
	  required: true, // Degree is required
	},
	branch: {
	  type: String, // Data type for the branch field
	  required: true, // Branch is required
	},
	year: {
	  type: String, // Data type for the year field
	  required: true, // Year is required
	},
	subject: {
	  type: String, // Data type for the subject field
	  required: true, // Subject is required
	},
	chatHistory: [
	  {
		type: Schema.Types.ObjectId, // Data type for ObjectId
		ref: 'PairedMessage', // Reference to the PairedMessage model
	  },
	],
  },
  { timestamps: true } // Enable timestamps for created and updated times
);

// Define the Chat model using the schema
// If the model exists in the models collection, use it; otherwise, create a new one
const Chat = models.Chat || model('Chat', chatSchema);

export default Chat; // Export the Chat model for use in other parts of the application
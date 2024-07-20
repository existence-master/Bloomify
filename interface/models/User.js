import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions

const { Schema, model, models } = mongoose; // Destructuring Schema, model, and models from mongoose

// Define the schema for the User collection
const userSchema = new Schema(
  {
	email: {
	  type: String, // Data type for the email field
	  unique: true, // Ensures each email is unique
	  required: true, // Email is required
	},
	password: {
	  type: String, // Data type for the password field
	  required: false, // Password is optional (not needed for Google users)
	},
	username: {
	  type: String, // Data type for the username field
	  required: false, // Username is optional initially
	},
	university: {
	  type: String, // Data type for the university field
	  required: false, // University is optional
	},
	chats: [
	  {
		type: Schema.Types.ObjectId, // References to the Chat model
		ref: "Chat", // Reference the Chat collection
		required: false, // This field can be optional
	  },
	],
	googleUser: {
	  type: Boolean, // Indicates if the user signed up with Google
	  required: false, // This field is optional
	},
  },
  { timestamps: true } // Enable automatic timestamps for created and updated times
);

// Define the User model using the schema
// If the model exists in the models collection, use it; otherwise, create a new one
const User = models.User || model("User", userSchema);

export default User; // Export the User model for use in other parts of the application

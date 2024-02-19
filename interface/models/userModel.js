// Import the mongoose library for MongoDB schema
import mongoose, {Schema, models} from "mongoose"

// Define the user schema with required fields (username, email, password, university)
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    university: {
      type: String,
      required: [true, "Please select a university"],
    },
  },
  {
    timestamps: true
  }
)

// Create a User model based on the user schema, with a unique constraint on username and email
const User = models.User || mongoose.model("User", userSchema)

// Export the User model for use in other parts of the application
export default User

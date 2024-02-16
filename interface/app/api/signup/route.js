// Import necessary modules and functions
import { connectToDB } from "@utils/database"
import User from "@models/userModel"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Define the POST function for user registration
export async function POST(req) {
  try {
    // Extract user information from the request body
    const { username, email, password, university } = await req.json()

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10)

    // Connect to the database
    await connectToDB();

    // Create a new user in the database
    await User.create({ username, email, password: hashedPassword, university })

    // Return a JSON response indicating successful user registration
    return NextResponse.json({ message: "User registered" }, { status: 201 })
  }
  
  catch (error) {
    // Return a JSON response in case of an error during registration
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

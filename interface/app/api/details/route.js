import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Database connection utility
import { NextResponse } from "next/server"; // Import Next.js server response handling

export const POST = async (request) => {
	try {
		// Parse the request body to extract the necessary fields
		const { username, university, userEmail } = await request.json();

		// Connect to the database
		await connect();

		// Check if the provided username is already taken
		const existingUsername = await User.findOne({ username });

		if (existingUsername) {
			return new NextResponse("This username is already taken", {
				status: 400,
			}); // Return 400 if username is taken
		}

		// Update the user document with the new username and university
		await User.findOneAndUpdate(
			{ email: userEmail }, // Find the user by email
			{ username, university } // Update with the new data
		);

		return new NextResponse("Username Registered", { status: 200 }); // Return 200 for successful registration
	} catch (err) {
		return new NextResponse("Internal server error", {
			status: 500,
		}); // Return 500 if an internal server error occurs
	}
};

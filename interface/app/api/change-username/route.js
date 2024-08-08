import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Utility for database connection
import { authOptions } from "../auth/[...nextauth]/route"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import NextAuth session handling
import { NextResponse } from "next/server"; // Import Next.js server response

export const POST = async (request) => {
	const session = await getServerSession(authOptions); // Get the current user session
	await connect(); // Connect to the database

	// If there's no session or user email in the session, return unauthorized
	if (!session || !session.user?.email) {
		return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
	}

	try {
		const { email: userEmail } = session.user; // Get the email from the session
		const { newUsername } = await request.json(); // Extract the new username from the request body

		// Validate the new username
		if (
			!newUsername ||
			typeof newUsername !== "string" ||
			newUsername.trim() === ""
		) {
			return new NextResponse("Invalid username", { status: 400 }); // 400 Bad Request
		}

		const trimmedUsername = newUsername.trim(); // Trim any extra spaces

		// Check if the new username already exists in the database
		const existingUser = await User.findOne({ username: trimmedUsername });

		if (existingUser) {
			return new NextResponse("Username already taken", { status: 409 }); // 409 Conflict
		}

		// Find the user by email
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return new NextResponse(`User with email ${userEmail} not found`, {
				status: 404,
			}); // 404 Not Found
		}

		// Update the user's username
		user.username = trimmedUsername; // Set the new username
		await user.save(); // Save the updated user document

		return new NextResponse(
			JSON.stringify({ message: "Username updated successfully" }),
			{ status: 200 }
		); // 200 OK with a success message
	} catch (error) {
		return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
	}
};

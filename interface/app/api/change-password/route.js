import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Import the database connection utility
import bcrypt from "bcryptjs"; // Library for password hashing
import { authOptions } from "../auth/[...nextauth]/route"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import NextAuth session handling
import { NextResponse } from "next/server"; // Import Next.js server response

export const POST = async (request) => {
	// Get the current user session
	const session = await getServerSession(authOptions);
	
	// Connect to the database
	await connect();
	
	// If the user is not logged in, return unauthorized
	if (!session || !session.user?.email) {
		return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
	}

	try {
		const { email: userEmail } = session.user; // Get the user's email from the session
		const { currentPassword, newPassword } = await request.json(); // Extract current and new passwords from the request

		// Validate that current and new passwords are provided
		if (!currentPassword || !newPassword || newPassword.trim() === "") {
			return new NextResponse("Current and new password are required", { status: 400 }); // 400 Bad Request
		}

		// Find the user by their email
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return new NextResponse(`User with email ${userEmail} not found`, { status: 404 }); // 404 Not Found
		}

		// Check if the current password matches the stored hashed password
		const isMatch = await bcrypt.compare(currentPassword, user.password);

		if (!isMatch) {
			return new NextResponse("Current password is incorrect", { status: 401 }); // 401 Unauthorized
		}

		// Hash the new password with a salt factor of 12
		const hashedPassword = await bcrypt.hash(newPassword.trim(), 12);

		// Update the user's password in the database
		user.password = hashedPassword; // Set the new hashed password
		await user.save(); // Save the changes to the database

		return new NextResponse(
			JSON.stringify({ message: "Password updated successfully" }),
			{ status: 200 }
		); // 200 OK with a success message
	} catch (error) {
		console.error("Error changing password:", error); // Log the error for debugging
		return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
	}
};
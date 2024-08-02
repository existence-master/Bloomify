import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Import the database connection utility
import bcrypt from "bcryptjs"; // Library for password hashing
import { authOptions } from "../auth/[...nextauth]/route"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import NextAuth session handling
import { NextResponse } from "next/server"; // Import Next.js server response
import { getCookie } from "cookies-next"; // Import function to get a cookie

export const POST = async (request) => {
	// Establish the database connection
	await connect();
	try {
		// Get the forgot-password-flow cookie
		const forgotPasswordFlow = getCookie("forgot-password-flow", {
			req: request,
		});

		let userEmail;
		let currentPassword;
		let newPassword;

		if (forgotPasswordFlow) {
			// If forgot-password-flow cookie is present, get userEmail and newPassword from the request
			const requestData = await request.json();
			userEmail = requestData.userEmail;
			newPassword = requestData.newPassword;

			if (!userEmail || !newPassword || newPassword.trim() === "") {
				return new NextResponse(
					"User email and new password are required for password reset",
					{ status: 400 }
				); // 400 Bad Request
			}
		} else {
			// Get the current user session
			const session = await getServerSession(authOptions);

			// If the user is not logged in and forgot-password-flow cookie is not present, return unauthorized
			if (!session || !session.user?.email) {
				return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
			}

			// Get the user's email from the session
			userEmail = session.user.email;

			// Extract current and new passwords from the request
			const requestData = await request.json();
			currentPassword = requestData.currentPassword;
			newPassword = requestData.newPassword;

			// Validate that new password is provided
			if (!newPassword || newPassword.trim() === "") {
				return new NextResponse("New password is required", {
					status: 400,
				}); // 400 Bad Request
			}
		}

		// Find the user by their email
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			return new NextResponse(`User with email ${userEmail} not found`, {
				status: 404,
			}); // 404 Not Found
		}

		// If forgot-password-flow cookie is not present, validate the current password
		if (!forgotPasswordFlow) {
			// Check if the current password matches the stored hashed password
			const isMatch = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (!isMatch) {
				return new NextResponse("Current password is incorrect", {
					status: 401,
				}); // 401 Unauthorized
			}
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
		return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
	}
};

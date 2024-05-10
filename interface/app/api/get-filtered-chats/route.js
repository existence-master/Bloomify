import User from "@models/User"; // Import the User model
import Chat from "@models/Chat"; // Import the Chat model
import connect from "@utils/db"; // Database connection utility
import { authOptions } from "../auth/[...nextauth]/route"; // NextAuth configuration
import { getServerSession } from "next-auth/next"; // Function to get the current session
import { NextResponse } from "next/server"; // Import Next.js server response handling

export const POST = async (request) => {
	const { degree, branch, year, subject } = await request.json(); // Extract request data
	const session = await getServerSession(authOptions); // Get the current session
	await connect(); // Connect to the database

	try {
		const userEmail = session.user?.email; // Get the user email from the session

		if (!userEmail) {
			throw new Error("User email not found in session"); // Error if user email is missing
		}

		// Find the user with the provided email
		const user = await User.findOne({ email: userEmail });

		if (!user) {
			throw new Error(`User with email ${userEmail} not found`); // Error if user not found
		}

		// Build a query to find chats belonging to the user with optional filters
		const query = {
			_id: { $in: user.chats }, // Only consider chats that belong to this user
		};

		// Conditionally add degree filter to the query if specified
		if (degree && degree !== "Degree") {
			query.degree = degree;
		}

		// Conditionally add branch filter to the query if specified
		if (branch && branch !== "Branch") {
			query.branch = branch;
		}

		// Conditionally add year filter to the query if specified
		if (year && year !== "Year") {
			query.year = year;
		}

		// Conditionally add subject filter to the query if specified
		if (subject && subject !== "Subject") {
			query.subject = subject;
		}

		// Find the filtered chats and select only the _id and title fields
		const filteredChats = await Chat.find(query).select("_id title");

		return new NextResponse(JSON.stringify(filteredChats), { status: 200 }); // Return filtered chats with HTTP status 200
	} catch (error) {
		console.error("Error updating user chat:", error); // Log the error for debugging
		return new NextResponse("Internal server error", { status: 500 }); // Return 500 if an internal server error occurs
	}
};
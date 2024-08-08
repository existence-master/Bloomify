import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Utility for database connection
import { authOptions } from "../auth/[...nextauth]/route"; // Import NextAuth options
import { getServerSession } from "next-auth/next"; // Import NextAuth session handling
import { NextResponse } from "next/server"; // Import Next.js server response
import { google } from "googleapis"; // Import googleapis package

// Initialize JWT client
const client = new google.auth.JWT(
	process.env.GOOGLE_FEEDBACK_SERVICE_ACCOUNT_EMAIL,
	null,
	process.env.GOOGLE_FEEDBACK_SERVICE_ACCOUNT_KEY,
	["https://www.googleapis.com/auth/spreadsheets"] // Adjust the scope if needed
);

const sheets = google.sheets({ version: "v4", auth: client });

export const GET = async (request) => {
	const session = await getServerSession(authOptions); // Get the current user session
	await connect(); // Connect to the database

	try {
		// If there's no session or user email in the session, return unauthorized
		if (!session || !session.user?.email) {
			return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
		}

		// Find the user based on the email in the session
		const user = await User.findOne({ email: session.user.email });

		// If user not found, return unauthorized
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
		}

		// Fetch data from Google Sheets
		const spreadsheetId = process.env.GOOGLE_FEEDBACK_SHEET_ID;
		const range = "Sheet1"; // Adjust range as necessary

		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range,
		});

		const rows = response.data.values;

		// Find the row with the user's email
		const row = rows.find((row) => row.includes(user.email));

		// If row not found, return results with false values
		if (!row) {
			return new NextResponse(
				JSON.stringify({
					Classify: false,
					Suggest: false,
					Generate: false,
				}),
				{
					status: 200,
				}
			); // 200 OK
		}

		// Define the column names to check
		const columnsToCheck = ["Classify", "Suggest", "Generate"];

		// Initialize the result object
		let result = {};

		// Check each column value
		columnsToCheck.forEach((column) => {
			const columnIndex = rows[0].indexOf(column);

			// If column not found, set the result to false
			if (
				columnIndex === -1 ||
				row[columnIndex] === undefined ||
				row[columnIndex] === null ||
				row[columnIndex] === ""
			) {
				result[column] = false;
			} else {
				result[column] = true;
			}
		});

		// Return the result object
		return new NextResponse(JSON.stringify(result), {
			status: 200,
		}); // 200 OK
	} catch (error) {
		console.log(error)
		//console.error("Error checking column values:", error); // Log the error for debugging
		return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
	}
};

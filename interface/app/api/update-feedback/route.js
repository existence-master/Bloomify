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
const spreadsheetId = process.env.GOOGLE_FEEDBACK_SHEET_ID; // Google Sheets ID

export const POST = async (request) => {
	const session = await getServerSession(authOptions); // Get the current user session
	await connect(); // Connect to the database

	try {
		// If there's no session or user email in the session, return unauthorized
		if (!session || !session.user?.email) {
			return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
		}

		// Extract feedback from the request body
		const { columnName, feedback } = await request.json();

		let sheet = columnName === "General" ? "Sheet2" : "Sheet1";

		// Find the user based on the email in the session
		const user = await User.findOne({ email: session.user.email });

		// If user not found, return unauthorized
		if (!user) {
			return new NextResponse("Unauthorized", { status: 401 }); // 401 Unauthorized
		}

		if (columnName === "General") {
			// Append the feedback to the "General" sheet
			const appendResponse = await sheets.spreadsheets.values.append({
				spreadsheetId,
				range: `${sheet}!A1`, // Adjust the range if necessary
				valueInputOption: "RAW",
				insertDataOption: "INSERT_ROWS",
				requestBody: {
					values: [
						[
							user.email,
							user.username,
							feedback,
							new Date().toISOString(),
						],
					],
				},
			});

			if (appendResponse.status === 200) {
				return new NextResponse("Feedback appended", { status: 200 }); // 200 OK
			} else {
				return new NextResponse("Failed to append feedback", {
					status: 500,
				}); // 500 Internal Server Error
			}
		} else {
			// Fetch the existing data from the Google Sheet
			const getResponse = await sheets.spreadsheets.values.get({
				spreadsheetId,
				range: sheet, // Adjust the sheet name and range if necessary
			});

			const rows = getResponse.data.values;

			// Find the row with the user's email
			const rowIndex = rows.findIndex((row) => row.includes(user.email));

			if (rowIndex === -1) {
				return new NextResponse("User email not found in sheet", {
					status: 404,
				}); // 404 Not Found
			}

			// Find the column index
			const columnIndex = rows[0].indexOf(columnName);

			if (columnIndex === -1) {
				return new NextResponse("Column name not found in sheet", {
					status: 404,
				}); // 404 Not Found
			}

			// Update the feedback in the appropriate cell
			rows[rowIndex][columnIndex] = feedback;

			// Write the updated data back to the Google Sheet
			const updateResponse = await sheets.spreadsheets.values.update({
				spreadsheetId,
				range: `${sheet}!${String.fromCharCode(65 + columnIndex)}${
					rowIndex + 1
				}`, // Convert column index to letter and adjust for 1-based row index
				valueInputOption: "RAW",
				requestBody: {
					values: [[feedback]],
				},
			});

			if (updateResponse.status === 200) {
				return new NextResponse("Feedback updated", { status: 200 }); // 200 OK
			} else {
				return new NextResponse("Failed to update feedback", {
					status: 500,
				}); // 500 Internal Server Error
			}
		}
	} catch (error) {
		return new NextResponse("Internal server error", { status: 500 }); // 500 Internal Server Error
	}
};
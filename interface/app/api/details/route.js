import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Database connection utility
import { NextResponse } from "next/server"; // Import Next.js server response handling
import {google} from "googleapis"; // Import Google APIs

// Initialize JWT client
const client = new google.auth.JWT(
	process.env.GOOGLE_FEEDBACK_SERVICE_ACCOUNT_EMAIL,
	null,
	process.env.GOOGLE_FEEDBACK_SERVICE_ACCOUNT_KEY,
	["https://www.googleapis.com/auth/spreadsheets"] // Adjust the scope if needed
);

const sheets = google.sheets({ version: "v4", auth: client });
const spreadsheetId = process.env.GOOGLE_FEEDBACK_SHEET_ID;

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

		// Read existing data from Google Sheets
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range: "Sheet1", // Adjust the sheet name and range if necessary
		});

		const rows = response.data.values;
		const emailExists = rows.some((row) => row[0] === userEmail);

		if (!emailExists) {
			// Append new data to Google Sheets if email does not exist
			let requestBody = {
				values: [[userEmail, username, "", "", ""]],
			};

			await sheets.spreadsheets.values.append({
				spreadsheetId,
				range: "Sheet1", // Adjust the sheet name and range if necessary
				valueInputOption: "RAW",
				insertDataOption: "INSERT_ROWS",
				requestBody,
			});

		}

		return new NextResponse("Username Registered", { status: 200 }); // Return 200 for successful registration
	} catch (err) {
		return new NextResponse("Internal server error", {
			status: 500,
		}); // Return 500 if an internal server error occurs
	}
};

import { NextResponse } from "next/server"; // Import Next.js server response handling
import { cookies } from "next/headers"; // Import Next.js cookies handling

export async function POST(request) {
	try {
		// Parse the request body to get cookie name, value, and optional maxAge
		const { name, value, maxAge = 3600 } = await request.json(); // Default maxAge is 3600 seconds (1 hour)
		// Check if both name and value are provided
		if (!name || !value) {
			return NextResponse.json(
				{ message: "Cookie name and value are required" }, // Return error message
				{ status: 400 } // HTTP status 400 Bad Request
			);
		}

		// Set the cookie with the provided name, value, and optional maxAge
		cookies().set({
			name, // Cookie name
			value, // Cookie value
			httpOnly: false, // Set to true for HTTP-only cookies, false allows client-side access
			secure: process.env.NODE_ENV === "production", // Secure in production
			sameSite: "Lax", // SameSite attribute for cookie handling
			maxAge, // Maximum age for the cookie in seconds
		});

		return NextResponse.json(
			{ message: "Cookie set successfully" },
			{ status: 200 }
		); // Return success message with HTTP status 200
	} catch (error) {
		return NextResponse.json(
			{ message: "Error setting cookie" }, // Return error message
			{ status: 500 } // HTTP status 500 Internal Server Error
		);
	}
}

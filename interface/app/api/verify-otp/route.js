import { createHmac } from "crypto"; // Library for creating HMAC hashes
import { NextResponse } from "next/server"; // Next.js server response handling

export const POST = async (req) => {
	try {
		// Extract the userEmail, hash, and otp from the request body
		const { userEmail, hash, otp } = await req.json();

		// Split the hash into its value and expiration timestamp
		const [hashValue, expires] = hash.split(".");

		// Check if the OTP has expired
		const now = Date.now();
		if (now > parseInt(expires)) {
			return new NextResponse("OTP has expired", { status: 400 }); // Return 400 if expired
		}

		// Recalculate the hash with the same data
		const data = `${userEmail}.${otp}.${expires}`;
		const newCalculatedHash = createHmac(
			"sha256",
			process.env.SHA_SECRET_KEY
		)
			.update(data) // Hash the data
			.digest("hex"); // Convert to hexadecimal

		// Verify if the recalculated hash matches the provided hash
		if (newCalculatedHash === hashValue) {
			return new NextResponse("OTP verified successfully", {
				status: 200,
			}); // Return 200 for successful verification
		} else {
			return new NextResponse("OTP verification failed", { status: 400 }); // Return 400 if the hashes don't match
		}
	} catch (error) {
		return new NextResponse(
			"Error verifying OTP", // Error message
			{ status: 500 } // HTTP status 500 Internal Server Error
		);
	}
};

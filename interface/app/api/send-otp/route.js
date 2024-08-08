import { NextResponse } from "next/server"; // Import Next.js server response handling
import { generate } from "otp-generator"; // Library to generate OTPs
import { createHmac } from "crypto"; // Library to create HMAC hashes
import nodemailer from "nodemailer"; // Library to send emails

export const POST = async (req) => {
	const { userEmail } = await req.json(); // Extract userEmail from the request body

	// Configure Nodemailer with email SMTP transporter
	const transporter = nodemailer.createTransport({
		service: "gmail", // Gmail as the email service
		auth: {
			user: process.env.GMAIL_USER, // Gmail user from environment variables
			pass: process.env.GMAIL_PASSWORD, // Gmail password from environment variables
		},
		tls: {
			rejectUnauthorized: false, // Accept self-signed certificates
		},
	});

	try {
		// Generate a 6-character OTP with uppercase letters
		const otp = generate(6, {
			alphabets: true, // Include alphabets
			upperCase: true, // Include uppercase letters
			specialChars: false, // Exclude special characters
		});

		// Set the expiration time for the OTP (5 minutes)
		const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
		const expires = Date.now() + ttl; // Timestamp for expiration
		const data = `${userEmail}.${otp}.${expires}`; // Format data for HMAC hash

		// Create a SHA256 hash of the data with a secret key
		const hash = createHmac("sha256", process.env.SHA_SECRET_KEY)
			.update(data)
			.digest("hex");

		// Combine the hash with the expiration time
		const fullHash = `${hash}.${expires}`; // Format the full hash with expiration

		// Send the OTP to the user's email
		await transporter.sendMail({
			from: `"Bloomify" <${process.env.GMAIL_USER}>`, // Email sender
			to: userEmail, // Recipient email
			subject: "Your OTP for authentication", // Email subject
			text: `Your OTP for authentication is: ${otp}. Please use it to signup for Bloomify.`, // Email content
		});

		return new NextResponse(fullHash, { status: 200 }); // Return the hash as the response with HTTP status 200
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ error: "Failed to send OTP" }), // Return error message
			{ status: 400 } // HTTP status 400 Bad Request
		);
	}
};

import { NextResponse } from "next/server"; // Import Next.js server response handling
import { createCipheriv, randomBytes } from "crypto"; // Crypto library for encryption
import { getIronSession } from "iron-session"; // Iron-session for secure sessions
import { cookies } from "next/headers"; // Next.js cookies handling
import { sessionOptions } from "@utils/session"; // Import session configuration

export const POST = async (req) => {
	// Extract userEmail and password from the request body
	const { userEmail, password } = await req.json();
	// Get the current session using Iron-session
	const session = await getIronSession(cookies(), sessionOptions);

	try {
		// AES-256-CBC encryption setup requires a 256-bit key and a 128-bit IV
		const key = Buffer.from(process.env.AES_SECRET_KEY, "hex"); // 256-bit (32 bytes) key from environment variables
		const iv = randomBytes(16); // Generate a random 128-bit IV (16 bytes)

		// Encrypt the password using AES-256-CBC
		const cipher = createCipheriv("aes-256-cbc", key, iv); // Create a cipher with the key and IV
		let encryptedPassword = cipher.update(password, "utf8", "hex"); // Encrypt the password
		encryptedPassword += cipher.final("hex"); // Complete the encryption process

		// Store the encrypted password, IV, and userEmail in the session
		session.userEmail = userEmail; // Save the userEmail to the session
		session.encryptedPassword = encryptedPassword; // Save the encrypted password
		session.iv = iv.toString("hex"); // Save the IV in hexadecimal format

		// Save the session to persist the data
		await session.save();

		// Return a success message with HTTP status 200
		return new NextResponse("Session set successfully", { status: 200 });
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ error: "Failed to set session" }), // Return error message
			{ status: 400 } // HTTP status 400 Bad Request
		);
	}
};

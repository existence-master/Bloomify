import { NextResponse } from "next/server"; // Next.js server response handling
import { createDecipheriv } from "crypto"; // Node.js module for creating a decipher
import { getIronSession } from "iron-session"; // Iron-session for secure session handling
import { cookies } from "next/headers"; // Next.js headers handling
import { sessionOptions } from "@utils/session"; // Import session configuration

export const GET = async () => {
	// Get the current session using Iron-session
	const session = await getIronSession(cookies(), sessionOptions);

	try {
		// Retrieve the session data
		const userEmail = session.userEmail;
		const encryptedPassword = session.encryptedPassword;
		const ivHex = session.iv; // Initialization vector in hexadecimal

		// Check if all required data is present
		if (!userEmail || !encryptedPassword || !ivHex) {
			return new NextResponse(
				JSON.stringify({ error: "Session data not found" }),
				{ status: 404 } // HTTP status 404 Not Found
			);
		}

		// Convert the IV from hexadecimal to Buffer
		const iv = Buffer.from(ivHex, "hex");

		// Retrieve the AES key from environment variables
		const key = Buffer.from(process.env.AES_SECRET_KEY, "hex"); // AES 256-bit key

		// Create a decipher to decrypt the password
		const decipher = createDecipheriv("aes-256-cbc", key, iv);
		let decryptedPassword = decipher.update(
			encryptedPassword,
			"hex",
			"utf8"
		); // Decrypt the password
		decryptedPassword += decipher.final("utf8"); // Finalize the decryption

		// Return the decrypted session data
		return NextResponse.json(
			{
				userEmail,
				password: decryptedPassword, // The decrypted password
			},
			{ status: 200 } // HTTP status 200 OK
		);
	} catch (error) {
		return new NextResponse(
			JSON.stringify({ error: "Failed to retrieve session data" }),
			{ status: 500 } // HTTP status 500 Internal Server Error
		);
	}
};

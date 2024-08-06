import User from "@models/User"; // Import the User model
import connect from "@utils/db"; // Utility to connect to the database
import bcrypt from "bcryptjs"; // Library for hashing passwords
import { faker } from "@faker-js/faker"; // Library to generate fake data
import { NextResponse } from "next/server"; // Import Next.js server response handling

export const POST = async (request) => {
	try {
		await connect(); // Connect to the database
		faker.seed(Math.floor(Math.random() * 10000)); // Seed the faker library with a random seed

		// Extract userEmail and password from the request body
		const { userEmail, password } = await request.json();

		if (!userEmail || !password) {
			return new NextResponse("Email and password are required", {
				status: 400, // HTTP status 400 Bad Request
			});
		}

		// Check if the email is already in use
		const existingUser = await User.findOne({ email: userEmail }); // Find user by email

		if (existingUser) {
			return new NextResponse("Email is already in use", { status: 400 }); // Return if email is in use
		}

		// Hash the password with a salt factor of 12
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create a new user with the provided email and hashed password
		const newUser = new User({
			email: userEmail, // Set the user's email
			password: hashedPassword, // Set the hashed password
			username: faker.internet.userName(), // Generate a temporary fake username
			googleUser: false, // Indicate the user signed up with email and password
		});

		// Save the new user to the database
		await newUser.save();
		
		// Return a success message with HTTP status 200
		return new NextResponse("User is registered", { status: 200 });
	} catch (error) {
		return new NextResponse("Internal server error", { status: 500 }); // HTTP status 500 Internal Server Error
	}
};

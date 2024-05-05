import User from "@models/User"; // User model
import connect from "@utils/db"; // Database connection utility
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"; // Session handling
import { NextResponse } from "next/server"; // Next.js server response handling

export const POST = async (request) => {
  const session = await getServerSession(authOptions); // Get user session
  await connect(); // Connect to the database

  if (!session || !session.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 }); // Return unauthorized if no session
  }

  try {
    const { email: userEmail } = session.user; // Get the user's email from the session
    const { newUsername } = await request.json(); // Extract the new username from the request

    // Validate the new username
    if (!newUsername || typeof newUsername !== "string" || newUsername.trim() === "") {
      return new NextResponse("Invalid username", { status: 400 });
    }

    const trimmedUsername = newUsername.trim();

    // Check if the new username already exists
    const existingUser = await User.findOne({ username: trimmedUsername });

    if (existingUser) {
      return new NextResponse("Username already taken", { status: 409 }); // Return conflict status
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(`User with email ${userEmail} not found`, { status: 404 });
    }

    // Update the user's username
    user.username = trimmedUsername; // Set the new username
    await user.save(); // Save the updated user document

    return new NextResponse(
      JSON.stringify({ message: "Username updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing username:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
import User from "@models/User"; // User model
import connect from "@utils/db"; // Database connection utility
import bcrypt from "bcryptjs"; // For hashing passwords
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
    const { currentPassword, newPassword } = await request.json(); // Extract current and new passwords from request

    if (!currentPassword || !newPassword || newPassword.trim() === "") {
      return new NextResponse("Current and new password are required", { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(`User with email ${userEmail} not found`, { status: 404 });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return new NextResponse("Current password is incorrect", { status: 401 }); // Return unauthorized
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 12);

    // Update the user's password
    user.password = hashedPassword; // Set the new hashed password
    await user.save(); // Save the updated user document

    return new NextResponse(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
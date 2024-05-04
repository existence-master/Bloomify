import User from "@models/User"; // User model
import Chat from "@models/Chat"; // Chat model
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
    const { title, degree, branch, year, subject } = await request.json(); // Extract data from request

    // Ensure the user has been found
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse(`User with email ${userEmail} not found`, { status: 404 });
    }

    // Create a new chat with the provided fields
    const newChat = await Chat.create({
      title,
      degree,
      branch,
      year,
      subject,
    });

    // Add the new chat to the user's chats array
    user.chats.push(newChat._id); // Push the new chat ID to the user's chats
    await user.save(); // Save the updated user document

    // Return the new chat ID as the response
    return new NextResponse(
      JSON.stringify({ chatId: newChat._id }), // Return the ID as JSON
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating new chat:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

import User from "@models/User"; // User model
import Chat from "@models/Chat"; // Chat model
import connect from "@utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { degree, branch, year, subject } = await request.json();
  const session = await getServerSession(authOptions);
  await connect();

  try {
    const userEmail = session.user.email;

    if (!userEmail) {
      throw new Error("User email not found in session");
    }

    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error(`User with email ${userEmail} not found`);
    }

    const query = {
      _id: { $in: user.chats }, // Only consider chats that belong to this user
    };

    console.log(user.chats)
    
    // Conditionally add filters to the query object
    if (degree !== "Degree") {
      query.degree = degree; // Add the degree filter if it's not "Degree"
    }
    
    if (branch !== "Branch") {
      query.branch = branch; // Add the branch filter if it's not "Branch"
    }
    
    if (year !== "Year") {
      query.year = year; // Add the year filter if it's not "Year"
    }
    
    if (subject !== "Subject") {
      query.subject = subject; // Add the subject filter if it's not "Subject"
    }

    console.log(query)

    const filteredChats = await Chat.find(query).select("_id title");

    console.log(filteredChats)

    return new NextResponse(JSON.stringify(filteredChats), { status: 200 });
  } catch (error) {
    console.error("Error updating user chat:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

import User from "@models/User"; // User model
import connect from "@utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  await connect();

  try {
    const userEmail = session.user.email;
    console.log(userEmail)

    if (!userEmail) {
      throw new Error("User email not found in session");
    }

    // Find the user with the provided email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error(`User with email ${userEmail} not found`);
      }
    
    const username = user.username
    const university = user.university
    const googleUser = user.googleUser

    return new NextResponse(JSON.stringify({ username, university, googleUser }), { status: 200 });
  } catch (error) {
    console.error("Error updating user chat:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

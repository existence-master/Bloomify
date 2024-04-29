import User from "@models/User";
import connect from "@utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { username, university, userEmail } = await request.json();

  await connect();
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return new NextResponse("This username is already taken", { status: 400 });
  }
 
  try {
    await User.findOneAndUpdate(
      { email: userEmail }, // Condition to find the user
      { username: username, university: university }, // Data to update
      { new: true } // Return the updated document
    );
    return new NextResponse("Username Registered", { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

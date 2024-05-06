import User from "@models/User";
import connect from "@utils/db";
import bcrypt from "bcryptjs";
import {faker} from "@faker-js/faker";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();
    faker.seed(Math.floor(Math.random() * 10000))

    const { userEmail, password } = await request.json();

    if (!userEmail || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email: userEmail,
      password: hashedPassword,
      username: faker.internet.userName(), // Temporary fake username to avoid null value conflicts
      googleUser: false // Signed up with email and password
    });

    await newUser.save();

    return new NextResponse("User is registered", { status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

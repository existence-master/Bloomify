import { NextResponse } from "next/server";
import { generate } from "otp-generator";
import { createHmac } from "crypto";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  const { userEmail } = await req.json();

  // Configure Nodemailer with an email SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Example, adjust as needed
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const otp = generate(6, {
      alphabets: true,
      upperCase: true,
      specialChars: false,
    });
    const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
    const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
    const data = `${userEmail}.${otp}.${expires}`; // userEmail.otp.expiry_timestamp
    const hash = createHmac("sha256", process.env.SHA_SECRET_KEY)
      .update(data)
      .digest("hex"); // creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user

    // Send the OTP via email
    await transporter.sendMail({
      from: `"Bloomify" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: "Your OTP for authentication",
      text: `Your OTP for authentication is: ${otp}. Please use it to signup for Bloomify.`,
    });

    console.log(`OTP sent to ${userEmail}: ${otp}`);
    return new NextResponse(fullHash, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new NextResponse({ error: "Failed to send OTP" }, { status: 400 });
  }
};

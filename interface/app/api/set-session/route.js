import { NextResponse } from "next/server";
import { createCipheriv, randomBytes } from "crypto";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@utils/session";

export const POST = async (req) => {
  const { userEmail, password } = await req.json();
  const session = await getIronSession(cookies(), sessionOptions);

  try {
    // AES-256-CBC requires a 256-bit key and a 128-bit IV
    const key = Buffer.from(process.env.AES_SECRET_KEY, "hex"); // You must set this to a 256-bit (32 bytes) key
    const iv = randomBytes(16); // 128-bit IV

    // Encrypt the password
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    let encryptedPassword = cipher.update(password, "utf8", "hex");
    encryptedPassword += cipher.final("hex");

    // Save the encrypted password and IV to the session
    session.userEmail = userEmail;
    session.encryptedPassword = encryptedPassword;
    session.iv = iv.toString("hex");

    await session.save();

    return new NextResponse("Session set successfully", { status: 200 });
  } catch (error) {
    console.error("Error setting session:", error);
    return new NextResponse(
      { error: "Failed to set session" },
      { status: 400 }
    );
  }
};

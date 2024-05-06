import { NextResponse } from "next/server";
import { createDecipheriv } from "crypto";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@utils/session";

export const GET = async () => {
  const session = await getIronSession(cookies(), sessionOptions);

  try {
    // Retrieve data from the session
    const userEmail = session.userEmail;
    const encryptedPassword = session.encryptedPassword;
    const ivHex = session.iv;
      
      console.log(userEmail)
      console.log(encryptedPassword)
      console.log(ivHex)

    if (!userEmail || !encryptedPassword || !ivHex) {
      return new NextResponse(
        { error: "Session data not found" },
        { status: 404 }
      );
    }

    // Convert IV from hex to Buffer
    const iv = Buffer.from(ivHex, "hex");

    // Get the encryption key from environment variables
    const key = Buffer.from(process.env.AES_SECRET_KEY, "hex"); // 256-bit key

    // Decrypt the encryptedPassword
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    let decryptedPassword = decipher.update(encryptedPassword, "hex", "utf8");
    decryptedPassword += decipher.final("utf8");
    const password = decryptedPassword;

    // Return the decrypted session data
    return NextResponse.json(
      {
        userEmail,
        password,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving or decrypting session data:", error);
    return new NextResponse(
      { error: "Failed to retrieve session data" },
      { status: 500 }
    );
  }
};

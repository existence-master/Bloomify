import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // Parse the request body to get cookie name and value
    const { name, value, maxAge = 3600 } = await request.json();

    if (!name || !value) {
      return NextResponse.json(
        { message: "Cookie name and value are required" },
        { status: 400 }
      );
    }

    // Set the cookie with the provided name, value, and optional maxAge
    cookies().set({
      name,
      value,
      httpOnly: false, // Ensures it's not accessible by client-side JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure in production
      sameSite: 'Lax', // Lax, Strict, or None
      maxAge, // Default expiration time, can be customized
    });

    return NextResponse.json({ message: "Cookie set successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error setting cookie:", error);
    return NextResponse.json({ message: "Error setting cookie" }, { status: 500 });
  }
}

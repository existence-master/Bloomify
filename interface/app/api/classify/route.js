// Import necessary modules and functions
import { NextResponse } from "next/server"

// Define the POST function for classifying questions
export async function POST(req) {
  try {
    // Extract the question from the request body
    const { question } = await req.json()

    // Make a request to the external FastAPI route for classification
    const apiUrl = "EXTERNAL_FASTAPI_ROUTE";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Extract the classification level from the FastAPI response
      const { level } = await response.json()

      // Return a JSON response with the classification level
      return NextResponse.json({ level }, { status: 200 })
    } else {
      // Handle errors and return an appropriate JSON response
      return NextResponse.json({ error: "Error in external FastAPI route" }, { status: 500 })
    }
  } catch (error) {
    // Something went wrong in the try block, return an internal server error
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
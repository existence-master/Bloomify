import Chat from "@models/Chat";
import connect from "@utils/db";
import { NextResponse } from "next/server";
import PairedMessage from "@models/PairedMessage";
import { formatKeyValueString } from "@utils/helpers";

export const POST = async (request) => {
  try {

    await connect();

    const {chatId} = await request.json()  

    // Populate the chat history from the `Chat` model
    const chat = await Chat.findById(chatId)

    if (!chat) {
      throw new Error("Chat not found");
      }
      
    const chatTitle = chat.title
    const chatFilters = {
        degree: chat.degree,
        branch: chat.branch,
        year: chat.year,
        subject: chat.subject,
      };
      
    // Create an array to store input-output pairs
    const chatHistory = [];

    // Populate the array with input-output pairs
    for (const pairedChatID of chat.chatHistory) {
    const message = await PairedMessage.findById(pairedChatID);

    if (!message) {
        throw new Error(`PairedMessage with ID ${pairedChatID} not found`);
    }

    // Append an object with the input and response to the array
    chatHistory.push({
        input: formatKeyValueString(message.input), 
        response: message.response,
    });
    }

    return new NextResponse(JSON.stringify({ chatTitle, chatFilters, chatHistory}), {
    status: 200,
    });
  } catch (error) {
    console.error("Error during GET request:", error);
    return new NextResponse(
      JSON.stringify({ message: error.message, error: error }),
      { status: 500 }
    );
  }
};

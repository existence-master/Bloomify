import Chat from "@models/Chat"; // Chat model
import PairedMessage from "@models/PairedMessage"; // PairedMessage model
import connect from "@utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { chatId, query, responseData } = await request.json();
  await connect();

  try {

    const chat = await Chat.findById(chatId);

    // Create the new PairedMessage and save it
    const pairedMessage = new PairedMessage({
      input: query,
      response: responseData,
    });

    const savedPairedMessage = await pairedMessage.save();

    // Add the PairedMessage to the chat's history and update the chat
    chat.chatHistory.push(savedPairedMessage._id);
    await chat.save();

    console.log("Updated Chat:", chat);
    return new NextResponse("Chat updated", { status: 200 });
  } catch (error) {
    console.error("Error updating user chat:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

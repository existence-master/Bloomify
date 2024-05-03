import User from "@models/User"; // Import the User model
import Chat from "@models/Chat"; // Import the Chat model
import connect from "@utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";
import PairedMessage from "@models/PairedMessage";

export const GET = async () => {
    
    try {
        const session = await getServerSession(authOptions)
        await connect()
        const userEmail = session.user.email

        const user = await User.findOne({email: userEmail});
        if (!user || !user.chat) {
            console.error("User not found or user has no associated chat");
            return null;
        }
    
        // Populate the chat history from the `Chat` model
        const chat = await Chat.findById(user.chat).populate("chatHistory"); // This fetches the PairedMessages in chatHistory
    
        if (!chat) {
            console.error("Chat not found");
            return null;
        }
    
        // Create a dictionary to store input-output pairs
        const pairedChatData = {};
    
        // Populate the dictionary with input-output pairs
        chat.chatHistory.forEach( async (pairedChatID, index) => {
            let message = await PairedMessage.findByID(pairedChatID)
            pairedChatData[`message_${index + 1}`] = {
                input: message.input,
                response: message.response,
            };
        });

        console.log(pairedChatData)

        const userName = user.username
    
        return new NextResponse(JSON.stringify({ pairedChatData, userName }), { status: 200 });

    }
    catch (error) {
        console.error("Error updating user chat:", error);
        return new NextResponse("Internal server error", { status: 500 });

    }
}
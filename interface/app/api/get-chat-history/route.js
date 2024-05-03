import User from "@models/User"; 
import Chat from "@models/Chat"; 
import connect from "@utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import PairedMessage from "@models/PairedMessage";
import { formatKeyValueString } from "@utils/helpers";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error("User session not found");
        }

        await connect();

        const userEmail = session.user.email;
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.chat) {
            const newChat = new Chat({
                degree: "N/A", // Default values or values as per your requirement
                branch: "N/A",
                year: "N/A",
                subject: "N/A",
                chatHistory: []
            });

            // Save the new chat to the database
            const savedChat = await newChat.save();
            
            // Associate the new chat with the user and save the user
            user.chat = savedChat._id;
            await user.save();
        }

        // Populate the chat history from the `Chat` model
        const chat = await Chat.findById(user.chat).populate("chatHistory"); // Fetches the PairedMessages in chatHistory

        if (!chat) {
            throw new Error("Chat not found");
        }

        // Create a dictionary to store input-output pairs
        const pairedChatData = {};

        // Populate the dictionary with input-output pairs
        for (const [index, pairedChatID] of chat.chatHistory.entries()) {
            const message = await PairedMessage.findById(pairedChatID);
            if (!message) {
                throw new Error(`PairedMessage with ID ${pairedChatID} not found`);
            }
            pairedChatData[`message_${index + 1}`] = {
                input: formatKeyValueString(message.input),
                response: message.response,
            };
        }

        const userName = user.username;

        return new NextResponse(
            JSON.stringify({ pairedChatData, userName }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during GET request:", error);
        return new NextResponse(
            JSON.stringify({ message: error.message, error: error }),
            { status: 500 }
        );
    }
};
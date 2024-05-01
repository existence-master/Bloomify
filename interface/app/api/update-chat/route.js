import User from "@models/User"; // User model
import Chat from "@models/Chat"; // Chat model
import PairedMessage from "@models/PairedMessage"; // PairedMessage model
import connect from "@utils/db";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { query, responseData } = await request.json();
    const session = await getServerSession(authOptions)    
    await connect();

    try {
        const userEmail = session.user.email;

        if (!userEmail) {
            throw new Error("User email not found in session");
        }

        // Find the user with the provided email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        let chat;

        // If user already has a chat, retrieve it; otherwise, create a new one
        if (user.chat) {
            chat = await Chat.findById(user.chat);
        }

        // If the retrieved chat is not found, or if the user didn't have a chat, create a new one
        if (!chat) {
            chat = new Chat({
                degree: "N/A", // Default values or values as per your requirement
                branch: "N/A",
                year: "N/A",
                subject: "N/A",
                chatHistory: []
            });

            // Save the new chat to the database
            const savedChat = await chat.save();
            
            // Associate the new chat with the user and save the user
            user.chat = savedChat._id;
            await user.save();
        }

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

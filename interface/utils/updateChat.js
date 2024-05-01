"use client"

import User from "@models/User"; // User model
import Chat from "@models/Chat" // Chat model
import PairedMessage from '@models/PairedMessage'; // PairedMessage model
import connect from "./db";

async function run() {
    await connect()
  }

const updateChat = async (session, query, responseData) => {

    console.log(session)
    console.log(query)
    console.log(responseData)

    try {
        const userEmail = session.user.email; 
        
        if (!userEmail) {
            throw new Error("User email not found in session");
        }
        
        console.log(User)

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        const chatId = user.chat; 
        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error(`Chat with ID ${chatId} not found`);
        }

        const pairedMessage = new PairedMessage({
            input: query, // Using the query object for the `input` field
            response: responseData, // The response to be stored
        });

        // Save the PairedMessage to the database
        const savedPairedMessage = await pairedMessage.save(); // Create the new PairedMessage

        chat.chatHistory.push(savedPairedMessage._id); // Add the PairedMessage to chatHistory
        const updatedChat = await chat.save(); // Save the updated Chat

        console.log("Updated Chat:", updatedChat);

    } catch (error) {
        console.error("Error updating user chat:", error);
        throw error; // Handle errors appropriately
    } 
};

export default updateChat
"use client"

import connect from './db'; // Database connection utility
import User from '@models/User'; // User model
import Chat from "@models/Chat" // Chat model
import PairedMessage from '@models/PairedMessage'; // PairedMessage model
import { useSession } from 'next-auth/react';

const updateChat = async (session, query, responseData) => {

    const {data: session} = useSession()
    await connect(); // Ensure database connection

    try {
        // Step 1: Get the user's email from the session
        const userEmail = session.userEmail; // Assume you have the email in the session
        
        if (!userEmail) {
            throw new Error("User email not found in session");
        }

        // Step 2: Retrieve the user by email
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        // Step 3: Retrieve the associated chat
        const chatId = user.chat; // Assuming `user.chat` contains the `Chat` ObjectId
        const chat = await Chat.findById(chatId);

        if (!chat) {
            throw new Error(`Chat with ID ${chatId} not found`);
        }

        // Step 4: Create a new PairedMessage
        const pairedMessage = new PairedMessage({
            input: query, // Using the query object for the `input` field
            response: responseData, // The response to be stored
        });

        // Save the PairedMessage to the database
        const savedPairedMessage = await pairedMessage.save(); // Create the new PairedMessage

        // Step 5: Add the PairedMessage to chatHistory and save
        chat.chatHistory.push(savedPairedMessage._id); // Add the PairedMessage to chatHistory
        const updatedChat = await chat.save(); // Save the updated Chat

        console.log("Updated Chat:", updatedChat);

        return updatedChat; // Return the updated Chat document
    } catch (error) {
        console.error("Error updating user chat:", error);
        throw error; // Handle errors appropriately
    } finally {
        // Optionally, close the MongoDB connection if needed
        mongoose.connection.close(); 
    }
};
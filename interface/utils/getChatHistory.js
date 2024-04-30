import User from '@models/User'; // Import the User model
import Chat from '@models/Chat'; // Import the Chat model

const getChatHistory = async (session) => {
    const user = await User.findById(session.user.email);

    if (!user || !user.chat) {
        console.error('User not found or user has no associated chat');
        return null;
    }

    // Populate the chat history from the `Chat` model
    const chat = await Chat.findById(user.chat).populate('chatHistory'); // This fetches the PairedMessages in chatHistory

    if (!chat) {
        console.error('Chat not found');
        return null;
    }

    // Create a dictionary to store input-output pairs
    const pairedChatData = {};

    // Populate the dictionary with input-output pairs
    chat.chatHistory.forEach((message, index) => {
        pairedChatData[`message_${index + 1}`] = {
            input: message.input,
            response: message.response,
        };
    });

    return pairedChatData
}

export default getChatHistory
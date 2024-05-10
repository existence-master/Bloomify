"use client"; // Indicates that this component uses client-side rendering

import { useState } from 'react'; // React hook for managing component state
import Image from 'next/image'; // Component for displaying images in Next.js
import MarkdownRenderer from '@components/MarkdownRenderer'; // Component for rendering markdown content

// The ChatBubble component represents a single chat message in the chat interface
// It displays the message content, user icon, mode of message, and a copy-to-clipboard functionality
const ChatBubble = ({ role, message, mode }) => {
  const [isCopied, setIsCopied] = useState(false); // State to track whether the message has been copied
  const isUser = role === 'User'; // Determine if the chat bubble is from a user
  const alignClass = isUser ? 'justify-end' : 'justify-start'; // Alignment class based on user role
  const bubbleAlignClass = isUser ? 'self-end' : 'self-start'; // Alignment class for the chat bubble

  // Function to copy the message to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message); // Copy the message text to the clipboard
    setIsCopied(true); // Set the copied state to true
    setTimeout(() => {
      setIsCopied(false); // Reset the copied state after 1.5 seconds
    }, 1500); // Timeout duration
  };

  return (
    <div className={`flex items-start gap-2.5 mb-2 ${alignClass}`}> {/* Container for chat bubble */}
      {/* Display the copy button for user messages */}
      {isUser && (
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied' : 'Copy'} {/* Display "Copied" or "Copy" based on state */}
        </button>
      )}

      {/* Display icon for Bloomify messages */}
      {role === "Bloomify" && (
        <Image
          src="/bloomify logo.png" // Path to the Bloomify logo
          alt="Classify Icon" // Alt text for the image
          width={30} // Width of the image
          height={30} // Height of the image
          className='rounded-full bg-gray-200 p-1' // Styling for the image
        />
      )}

      {/* Main chat bubble */}
      <div className={`bg-[#BCD8C1] border-2 border-gray-400 flex flex-col w-1/3 leading-1.5 p-4 rounded-xl ${bubbleAlignClass}`}> {/* Chat bubble container */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse"> {/* Icon and mode label */}
          {/* Display icon and label based on message mode */}
          {mode === "Classification" && (
            <>
              <Image
                src="/classifyicon.svg" // Icon for classification mode
                alt="Classify Icon" // Alt text
                width={24} // Width
                height={24} // Height
              />
              <span className="text-xl font-semibold text-gray-900">Classify</span> {/* Mode label */}
            </>
          )}
          
          {/* Suggestion mode */}
          {mode === "Suggestion" && (
            <>
              <Image
                src="/suggesticon.svg" // Icon for suggestion mode
                alt="Suggest Icon" // Alt text
                width={24} // Width
                height={24} // Height
              />
              <span className="text-xl font-semibold text-gray-900">Suggest</span> {/* Mode label */}
            </>
          )}

          {/* Generation mode */}
          {mode === "Generation" && (
            <>
              <Image
                src="/generateicon.svg" // Icon for generation mode
                alt="Generate Icon" // Alt text
                width={24} // Width
                height={24} // Height
              />
              <span className="text-xl font-semibold text-gray-900">Generate</span> {/* Mode label */}
            </>
          )}
        </div> {/* End of icon and mode label section */}

        {/* Display the message content using MarkdownRenderer */}
        <p className="text-xl font-normal py-2.5 text-gray-900">
          <MarkdownRenderer message={message} /> {/* Render the message content */}
        </p> {/* End of message content */}
      </div> {/* End of chat bubble */}

      {/* Display the user icon for user messages */}
      {role === "User" && (
        <Image
          src="/user.svg" // Path to the user icon
          alt="User Icon" // Alt text for the icon
          width={24} // Width
          height={24} // Height
          className='rounded-full bg-gray-200 p-1' // Styling for the icon
        />
      )}

      {/* Display the copy button for non-user messages */}
      {!isUser && (
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied' : 'Copy'} {/* Display "Copied" or "Copy" based on state */}
        </button>
      )}
    </div> 
  );
};

export default ChatBubble; // Export the ChatBubble component
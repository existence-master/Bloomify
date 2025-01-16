import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ChatButton = ({ chat, handleChatClick, renameChat, deleteChat }) => {
  const [showOptions, setShowOptions] = useState(false); // For options dropdown
  const [isEditing, setIsEditing] = useState(false); // For rename mode
  const [newTitle, setNewTitle] = useState(chat.title); // Manage new chat title
  const optionsRef = useRef(null); // Reference for options menu
  const buttonRef = useRef(null); // Reference for the button

  const toggleOptions = (e) => {
    e.stopPropagation(); // Prevent parent button click
    setShowOptions((prev) => !prev); // Toggle options menu
  };

  const handleRename = (e) => {
    e.stopPropagation(); // Prevent parent button click
    renameChat(chat._id, newTitle); // Call the rename function with new title
    setIsEditing(false); // Exit editing mode
    setShowOptions(false); // Close menu
  };

  // Close options menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
        setShowOptions(false); // Close options menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Main Chat Button */}
      <button
        ref={buttonRef}
        className="bg-[#007991] text-white rounded-2xl border-2 border-black p-2 w-full mt-2 flex justify-between items-center"
        onClick={() => handleChatClick(chat._id)}
      >
        {isEditing ? (
          // Input field for renaming
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()} // Prevent triggering click on parent
            className="flex-grow bg-white text-black border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <span>{chat.title}</span>
        )}
        <button
          className="bg-transparent text-white text-xl p-2"
          onClick={toggleOptions}
        >
          ⋮
        </button>
      </button>

      {/* Dropdown Menu */}
      {showOptions && !isEditing && (
        <div
          ref={optionsRef}
          className="absolute right-0 top-full bg-gray-200 text-black shadow-md p-2 rounded-2xl z-10"
        >
          <button
            className="flex bg-[#00b8dd] text-black rounded-2xl border-2 border-black block w-full text-left px-4 py-2 "
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent button click
              setIsEditing(true); // Enter rename mode
              setShowOptions(false); // Close dropdown
            }}
          >
            <Image
              src="/rename.svg"
              className="cursor-pointer mr-3"
              width={25}
              height={25}
              alt="Rename"
            />
            Rename
          </button>
          <button
            className="flex bg-red-500 text-black rounded-2xl border-2 border-black block w-full text-left px-4 py-2 mt-2"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent button click
              deleteChat(chat._id); // Call delete function
              setShowOptions(false); // Close dropdown
            }}
          >
            <Image
              src="/delete.svg"
              className="cursor-pointer mr-3"
              width={25}
              height={25}
              alt="Delete"
            />
            Delete
          </button>
        </div>
      )}

      {/* Save button for renaming */}
      {isEditing && (
        <div className="absolute right-0 mt-2 bg-white text-black shadow-md p-2 rounded z-10 flex items-center gap-2">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={handleRename}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent button click
              setIsEditing(false); // Cancel renaming
              setNewTitle(chat.title); // Reset to original title
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
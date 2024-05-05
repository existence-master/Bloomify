"use client";
import { useState } from 'react';
import Image from 'next/image';

const ChatBubble = ({ role, message, mode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = role === 'User';
  const alignClass = isUser ? 'justify-end' : 'justify-start';
  const bubbleAlignClass = isUser ? 'self-end' : 'self-start';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500); // Reset copied state after 1.5 seconds
  };


  return (
    <div className={`flex items-start gap-2.5 mb-2 ${alignClass}`}>
      {isUser && (
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      )}
        {role === "Bloomify" && (
          <Image
            src="/bloomify logo.png"
            alt="Classify Icon"
            width={30}
            height={30}
            className='rounded-full bg-gray-200 p-1'
          />
        )}
      <div className={`bg-[#BCD8C1] border-2 border-gray-400 flex flex-col w-96 leading-1.5 p-4 rounded-xl ${bubbleAlignClass}`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {mode === "Classification" && (
          <>
          <Image
            src="/classifyicon.svg"
            alt="User Icon"
            width={24}
            height={24}
          />
          <span className="text-xl font-semibold text-gray-900">Classify</span>
          </>
        )}
        {mode === "Suggestion" && (
          <>
          <Image
            src="/suggesticon.svg"
            alt="User Icon"
            width={24}
            height={24}
          />
          <span className="text-xl font-semibold text-gray-900">Suggest</span>
          </>
        )}
        {mode === "Generation" && (
          <>
          <Image
            src="/generateicon.svg"
            alt="User Icon"
            width={24}
            height={24}
          />
          <span className="text-xl font-semibold text-gray-900">Generate</span>
          </>
        )}
        </div>
        <p className="text-xl font-normal py-2.5 text-gray-900">{message}</p>
      </div>
      {role === "User" && (
          <Image
            src="/user.svg"
            alt="User Icon"
            width={24}
            height={24}
            className='rounded-full bg-gray-200 p-1'
          />
        )}
      {!isUser && (
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
          type="button"
          onClick={copyToClipboard}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
};


export default ChatBubble;

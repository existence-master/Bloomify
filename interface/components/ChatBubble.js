"use client";
import { useState } from 'react';

const ChatBubble = ({ role, message }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500); // Reset copied state after 1.5 seconds
  };

  const bgColor = role === 'user' ? '#BCD8C1' : 'red';

  return (
    <div className="flex items-start gap-2.5">
      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700" style={{ backgroundColor: bgColor }}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
      </div>
      <button
        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button"
        onClick={copyToClipboard}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default ChatBubble;

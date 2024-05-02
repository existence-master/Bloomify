"use client";

import { useState, useEffect } from 'react';
import { FaUser, FaPlusCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import DialogBox from '@components/DialogBox';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [chatHistory, setChatHistory] = useState({})

  const reloadChat = async () => {
    const response = await fetch("/api/get-chat-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors" // Send user input in the specified format
    });

    const responseData = await response.json()

    setChatHistory(responseData)
  }
  
    // UseEffect hook to load chat history on component mount
    useEffect(() => {
      reloadChat();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status !== "authenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div className="bg-[#FFFAE3] w-screen h-screen flex">
      <aside id="left-sidebar" className="border-4 fixed top-0 left-0 z-40 w-1/4 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
            <div>
              <ul className="space-y-2 font-medium">
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
                      <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                      </svg>
                      <span className="ms-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
                      <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                      </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/contactus" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap">Contact Us</span>
                    </Link>
                </li>
              </ul>
              {/* Dropdowns */}
              <div className="bg-[#FFFAE3] mt-4">
              <div className="flex justify-between">
                <div className="w-1/2 gap-2">
                  <select className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <select className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                    <option value="AI DS">AI DS</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="EnTC">EnTC</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <select className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>            
                  </select>
                </div>
                <div className="w-1/2">
                  <select className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                    <option value="ANN">ANN</option>
                    <option value="CS">CS</option>
                    <option value="DS">DS</option>
                  </select>
                </div>
              </div>
              <button type="button" className="w-full px-5 py-2.5 text-sm font-medium text-white bg-[#007991] hover:bg-[#222E50] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">New Chat</button>          
            </div>
          </div>
          <div id="left-bottom" className="">
            Username
          </div>
        </div>
      </aside>
      <div id="right" className="h-full w-3/4">
        {/*<DialogBox mode = "suggestion" reloadChat={reloadChat}/>*/}
        {/*to display message history*/}
        <div>
          {/* Iterate over the chatHistory object and render chat bubbles */}
          {Object.keys(chatHistory).map((key, index) => (
            <div key={index} className="chat-bubble">
              {/* Render input message */}
              <div className="input-message">{chatHistory[key].input}</div>
              {/* Render response message */}
              <div className="response-message">{chatHistory[key].response}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* varad's code - old

"use client";

import { useState } from 'react';
import { FaUser, FaPlusCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import DialogBox from '@components/DialogBox';

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [chatHistory, setChatHistory] = useState({})

  const reloadChat = async () => {
    const response = await fetch("/api/get-chat-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors" // Send user input in the specified format
    });

    const responseData = await response.json()

    setChatHistory(responseData)
  }
  
  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status !== "authenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div className="h-screen w-screen bg-amber-100 flex">
      <div className="h-full w-1/4 bg-blue-200 ">
      <div id="top" className="flex gap-3">
          <img className="h-16 w-16 ml-7 mt-5  "src="\bloomify logo.png" alt="bloomify-logo" />
          <h1 className="text-cyan-600 ml-70 mt-7 text-5xl font-medium mb-10 text-center">Bloomify</h1>
      </div>  
      <div id="selection1" className="flex justify-center gap-20 mb-1">
      <select name="Degree " className="text-black pt-2 pb-2 pl-2 w-1/3 pr-2 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="BTech">BTech</option>
                                <option value="BSc">BSc</option>
      </select>
      <select name="Branch" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="AIDS">AIDS</option>
                                <option value="CS">CS</option>
      </select>
      </div> 
      <div id="selection2" className="flex justify-center gap-20 mb-5 ">
      <select name="Year" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="2019">SE</option>
                                <option value="2015">TE</option>
      </select>
      <select name="Subject" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="ANN">ANN</option>
                                <option value="FDS">FDS</option>
      </select>
      </div>
      <div id="bottom" className="flex mt-[400px] ml-5">
          <div id="icon-user" className=""><FaUser size={30}/></div>
          <div id="username"className="text-black mt-1 ml-5 mr-[180px]"><h4>Username</h4></div>
          <div id="icon-create"><FaPlusCircle size={30} /></div>
      </div>    
      </div>
      <div className="h-full w-3/4 bg-red-200">
        <button className="whitespace-nowrap mt-[640px] pt-2 pb-2 pl-2 pr-2 w-30 text-center ml-[1000px] rounded-lg border-black border-5 h-10 bg-amber-100 text-black">
        </button>
        <div id="msg-btn" className="whitespace-nowrap mt-[-400px] pt-2 pb-2 pl-2 pr-2 w-30 text-center ml-[900px] rounded-lg border-black border-5 h-10 bg-amber-100 text-black">
          <DialogBox mode = "suggestion" reloadChat={reloadChat}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

*/
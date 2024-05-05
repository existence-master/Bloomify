"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import DialogBox from "@components/DialogBox";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import { useRouter, useParams } from "next/navigation";
import ChatBubble from "@components/ChatBubble";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter()
  const { id: chatId} = useParams()
  const { data: session, status } = useSession()
  const [userDetails, setUserDetails] = useState({
    username: "",
    university: ""
  })
  const [chatFilters, setChatFilters] = useState({})
  const [filteredChats, setFilteredChats] = useState([])
  const [chatDetails, setChatDetails] = useState({
    chatFilters: {
      degree: "Degree",
      branch: "Branch",
      year: "Year",
      subject: "Subject",
    },
    chatHistory: [],
    chatTitle: "",
    chatId: chatId
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("/api/get-user-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const details = await response.json()

      setUserDetails(details)
    }

    const fetchChatDetails = async () => {
      const response = await fetch("/api/get-chat-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId
        }),
      });

      const { chatTitle, chatFilters, chatHistory } = await response.json()
      console.log(chatTitle)
      console.log(chatFilters)
      console.log(chatHistory)
      setChatDetails((prevState) => ({
        ...prevState, 
        chatTitle,
        chatFilters, 
        chatHistory, 
      }));

      setChatFilters(chatFilters)
    }

    fetchUserDetails()
    fetchChatDetails()
  }, [])

  useEffect(() => {
    const fetchFilteredChats = async () => {
      const response = await fetch("/api/get-filtered-chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          degree: chatFilters.degree,
          branch: chatFilters.branch,
          year: chatFilters.year,
          subject: chatFilters.subject,
        }),
      });

      const chats = await response.json()
      setFilteredChats(chats)
    }
      // Initial fetch for filtered chats
      fetchFilteredChats();
  }, [chatFilters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    
    setChatFilters((prev) => (
      {
        ...prev,
        [name]: value
      }
    ));
  };

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`)
  }

  console.log(filteredChats)

  const reloadChat = async () => {
    const response = await fetch("/api/get-chat-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatId
      })
    });

    const { chatHistory } = await response.json()

    setChatDetails((prevState) => ({
      ...prevState, 
      chatHistory 
    }));
  }

  //Send Message Dropdown Logic
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(chatDetails.chatTitle)
  
  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status !== "authenticated") {
    return <p>Access Denied</p>
  }
  

  return (
    <div className="bg-[#FFFAE3] w-screen h-screen flex">
      <aside 
        id="left-sidebar" 
        className="border-r-2 border-black flex w-1/5 h-dvh transition-transform -translate-x-full sm:translate-x-0" 
        aria-label="Sidebar"
      >
        <div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
            <div>
              <ul className="space-y-2 font-medium">
                <li>
                    <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
                      <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                      </svg>
                      <span className="ms-3">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
                      <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
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
                  <select
                    className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    value={chatDetails.chatFilters.degree}
                    onChange={handleFilterChange}
                  >
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <select
                    className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    value={chatDetails.chatFilters.branch}
                    onChange={handleFilterChange}
                  >                    <option value="AI DS">AI DS</option>
                    <option value="CS">CS</option>
                    <option value="IT">IT</option>
                    <option value="EnTC">EnTC</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/2">
                  <select
                    className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    value={chatDetails.chatFilters.year}
                    onChange={handleFilterChange}
                  >                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>            
                  </select>
                </div>
                <div className="w-1/2">
                  <select
                    className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    value={chatDetails.chatFilters.subject}
                    onChange={handleFilterChange}
                  >
                    <option value="ANN">ANN</option>
                    <option value="CS">CS</option>
                    <option value="DS">DS</option>
                  </select>
                </div>
              </div>       
            </div>
          </div>
          <div id="filtered-chats" className="h-full mt-10">
          {filteredChats.map((chat, index) => (
          <div key={index} id="filtered-chat">
            <button className="bg-[#007991] text-white rounded-2xl border-2 border-black p-2 w-full mt-2" onClick={() => handleChatClick(chat._id)}>
              {chat.title}
            </button>
          </div>
          ))}
          </div>
          <div id="left-bottom" className="gap-2 flex">
            <div>
              <Image 
                src = "/user.svg"
                width = {36}
                height={36}
              />
            </div>
            <div className="text-xl font-bold">
              {userDetails.username}
            </div>
            <div>
              <SignoutButton />
            </div>
            <div className="absolute right-10">
              <Link href="/dashboard">
                <div className="rounded-full p-2 bg-[#007991]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </Link>   
            </div>
          </div>
        </div>
      </aside>
      <div id="right" className="flex flex-col h-dvh w-full">
        <div id="chat-title" className="w-full rounded-b-lg flex items-center justify-center text-white text-2xl font-Poppins font-semibold bg-[#007991] border-b border-gray-300">
          {chatDetails.chatTitle}
        </div>
        {/* <DialogBox mode="suggestion" reloadChat={reloadChat} chatDetails={chatDetails} university={ userDetails.university } /> */}
        <div className="fixed bottom-0 right-0 p-10">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center p-2 justify-center rounded-2xl border-2 border-black bg-[#007991] text-white hover:text-gray-900 hover:bg-gray-300 focus:outline-none"
            >
              Send Message
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute z-10 -top-44 bottom-0 right-8 mt-8 w-12 bg-transparent">
                {/* Menu items */}
                <DialogBox mode="classification" reloadChat={reloadChat} chatDetails={chatDetails} university={ userDetails.university } />
                <DialogBox mode="suggestion" reloadChat={reloadChat} chatDetails={chatDetails} university={ userDetails.university } />
                <DialogBox mode="generation" reloadChat={reloadChat} chatDetails={chatDetails} university={ userDetails.university } />
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#FFFAE3] flex flex-col flex-grow mt-4 p-4 overflow-y-auto">
          {/* Iterate over the chatHistory object and render chat bubbles */}
          {chatDetails.chatHistory?.map((message, index) => (
            <div key={index} className="pairedMessage">
              {/* Render the input message */}
              <ChatBubble role="User" message={message.input} />
              {/* Render the response message */}
              <ChatBubble role="Bloomify" message={message.response} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
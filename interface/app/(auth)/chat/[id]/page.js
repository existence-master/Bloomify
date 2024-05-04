"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import DialogBox from "@components/DialogBox";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import { renderWithLineBreaks } from "@utils/helpers";
import { useRouter, useParams } from "next/navigation";

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
        className="border-r-2 border-black flex w-1/4 h-full transition-transform -translate-x-full sm:translate-x-0" 
        aria-label="Sidebar"
      >
        <div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
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
              <Link href="/dashboard"><button type="button" className="w-full px-5 py-2.5 text-sm font-medium text-white bg-[#007991] hover:bg-[#222E50] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center">New Chat</button></Link>          
            </div>
          </div>
          <div id="filtered-chats">
          {filteredChats.map((chat, index) => (
          <div key={index} id="filtered-chat" onClick={() => handleChatClick(chat._id)}>
            <h3 id="chat-title">
              {chat.title}
            </h3>
          </div>
          ))}
          </div>
          <div id="left-bottom" className="gap-2 flex">
            <div>
              {userDetails.username}
            </div>
            <div>
              <SignoutButton />
            </div>
          </div>
        </div>
      </aside>
      <div id="right" className="h-full w-3/4">
        <div id = "chat-title">
          {chatDetails.chatTitle}
        </div>
        <DialogBox mode="suggestion" reloadChat={reloadChat} chatDetails={chatDetails} university={ userDetails.university } />
        <div className="flex">
          {/* Iterate over the chatHistory object and render chat bubbles */}
          {chatDetails.chatHistory?.map((message, index) => (
          <div key={index} className="pairedMessage">
            {/* Render the input message */}
            <div className="input-message">
              {renderWithLineBreaks(message.input)} 
            </div>
            {/* Render the response message */}
            <div className="response-message">
              {message.response}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
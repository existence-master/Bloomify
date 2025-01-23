"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import DialogBox from "@components/DialogBox";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import { useRouter, useParams } from "next/navigation";
import ChatBubble from "@components/ChatBubble";
import Image from "next/image";
import ErrorDisplay from "@components/ErrorDisplay";
import { IconInfoCircle } from "@tabler/icons-react";
import FeedbackForm from "@components/FeedbackForm";
import ChatButton from "@components/showOptions";
import { Tooltip } from 'react-tooltip'

import axios from "axios";

const Chat = () => {
  const router = useRouter();
  const { status } = useSession();
  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/unauthenticated");
    }
  }, [status, router]); // Ensure this effect runs when the status changes

  const { id: chatId } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: "",
    university: "university",
  });

  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatDetails, setChatDetails] = useState({
    chatFilters: {
      degree: "Degree",
      branch: "Branch",
      year: "Year",
      subject: "Subject",
    },
    chatHistory: [],
    chatTitle: "",
    chatId: chatId,
  });

  const [featureFeedback, setFeatureFeedback] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feature, setFeature] = useState("General");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  //Send Message Dropdown Logic

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/get-user-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user details: ${response.statusText}`
          );
        }

        const details = await response.json();
        const { username, university } = details;
        setUserDetails({ username, university });
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
      }
    };

    const fetchChatDetails = async () => {
      try {
        const response = await fetch("/api/get-chat-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: chatId,
          }),
        });

        if (response.status === 404) {
          router.push("/not-found");
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Failed to fetch chat details: ${response.statusText}`
          );
        }

        const { chatTitle, chatFilters, chatHistory } = await response.json();
        setChatDetails((prevState) => ({
          ...prevState,
          chatTitle,
          chatFilters,
          chatHistory,
        }));
      } catch (err) {
        setError(`Error fetching chat details: ${err.message}`);
      }
    };

    fetchUserDetails();
    fetchChatDetails();
  }, [chatId, router]);

  useEffect(() => {
    const fetchFilteredChats = async () => {
      try {
        const response = await fetch("/api/get-filtered-chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchQuery,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch filtered chats: ${response.statusText}`
          );
        }

        const chats = await response.json();
        setFilteredChats(chats);
      } catch (err) {
        setError(`Error fetching filtered chats: ${err.message}`);
      }
    };

    fetchFilteredChats();
  }, [searchQuery]);

  useEffect(() => {
    const checkFeedback = async () => {
      try {
        const response = await fetch("/api/check-feedback");

        if (response.ok) {
          const data = await response.json();
          setFeatureFeedback(data);
        } else {
          throw new Error("Error checking feedback");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkFeedback();
  }, [chatDetails.chatHistory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const renameChat = async (chatId, newTitle) => {
    try {
      const response = await axios.put('/api/rename-chat', { chatId, newTitle });
      if (response.status === 200) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error renaming chat:', error);
    }
  };


  const deleteChat = async (chatId) => {
    try {
      const response = await axios.delete(`/api/delete-chat`, {
        params: { id: chatId },
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Error deleting chat:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (featureFeedback[feature] === false) {
        setShowFeedbackForm(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [chatDetails.chatHistory]);

  const reloadChat = async (feature) => {
    try {
      const response = await fetch("/api/get-chat-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reload chat: ${response.statusText}`);
      }

      const { chatHistory } = await response.json();
      setChatDetails((prevState) => ({
        ...prevState,
        chatHistory,
      }));
      toggleMenu();
      setFeature(feature);
    } catch (err) {
      setError(`Error reloading chat: ${err.message}`);
    }
  };

  const handleReportFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = async (feedbackText) => {
    try {
      setIsSubmittingFeedback(true);
      const response = await fetch("/api/update-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnName: feature,
          feedback: feedbackText,
        }),
      });
      setIsSubmittingFeedback(false);

      if (response.ok) {
        setShowFeedbackForm(false);
        setFeature("General");
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFeedbackCancel = () => {
    setShowFeedbackForm(false);
  };

  const handleError = () => {
    setError(null);
  };

  // Return a loading state while the session status is loading
  if (status === "loading") {
    return (
      <div className="bg-[#FFFAE3] flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-4 text-green-600">Loading...</h1>
          <p className="text-lg">Please wait</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="xs:max-md:hidden bg-[#FFFAE3] w-screen h-screen flex justify-end">
          <aside
            id="left-sidebar"
            className="border-r-2 border-black flex w-1/5 transition-transform -translate-x-full fixed left-0 sm:translate-x-0 h-full"
            aria-label="Sidebar"
          >
            <div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
              <div>
                <Link
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg group"
                >
                  <Image
                    src="/navbarlogo.svg"
                    width={200}
                    height={50}
                    alt="Bloomify Logo"
                    className="mb-5"
                  />
                </Link>
                <ul className="space-y-2 font-medium">
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                      <span className="ms-3">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
                    >
                      <Image
                        src="/settingsicon.svg"
                        width={20}
                        height={20}
                        alt="Settings Icon"
                      />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Settings
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleReportFeedback}
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
                    >
                      <IconInfoCircle />
                      <span className="ms-3">Report Feedback</span>
                    </button>
                  </li>
                </ul>
                {/* Dropdowns */}
                <div className="bg-[#FFFAE3] mt-4">
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2 mb-4"
                  />
                </div>
              </div>
              <div id="filtered-chats" className="h-full mt-10 overflow-y-auto">
                {filteredChats.map((chat, index) => (
                  <div key={index} id="filtered-chat">
                    <ChatButton
                      chat={chat}
                      handleChatClick={handleChatClick}
                      renameChat={renameChat}
                      deleteChat={deleteChat}
                    />

                  </div>
                ))}
              </div>
              <div id="left-bottom" className="gap-2 flex">
                <div className="group">
                  <a
                    data-tooltip-id="logout-tooltip"
                    data-tooltip-content="Logout"
                    data-tooltip-place="top"
                  >
                    <SignoutButton />
                  </a>
                  <Tooltip id="logout-tooltip" />
                </div>
                <Link href="/settings" className="flex">
                  <div className="text-xl font-bold">
                    {userDetails.username}
                  </div>
                </Link>
                <div className="absolute right-4 bottom-4 group">
                  <div className="group">
                    <a
                      data-tooltip-id="create-tooltip"
                      data-tooltip-content="Create Chat"
                      data-tooltip-place="top"
                    >
                      <Link href="/dashboard">
                        <div className="rounded-full p-1 bg-[#007991]">
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
                    </a>
                    <Tooltip id="create-tooltip" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div id="right" className="flex flex-col w-4/5 h-dvh">
            <div
              id="chat-title"
              className="w-full rounded-b-lg flex items-center justify-center text-white text-2xl font-Poppins font-semibold bg-[#007991] border-b border-gray-300 pb-3 pt-3"
            >
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
                    <DialogBox
                      mode="classification"
                      reloadChat={reloadChat}
                      chatDetails={chatDetails}
                      university={userDetails.university}
                      featureFeedback={featureFeedback}
                    />
                    <DialogBox
                      mode="suggestion"
                      reloadChat={reloadChat}
                      chatDetails={chatDetails}
                      university={userDetails.university}
                      featureFeedback={featureFeedback}
                    />
                    <DialogBox
                      mode="generation"
                      reloadChat={reloadChat}
                      chatDetails={chatDetails}
                      university={userDetails.university}
                      featureFeedback={featureFeedback}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#FFFAE3] flex flex-col mt-4 p-4">
              {/* Iterate over the chatHistory object and render chat bubbles */}
              {chatDetails.chatHistory?.map((message, index) => {
                //  Alter the message.input to desired format
                let alteredInput = message.input;

                // as pre is used we have to use markdown instead of html
                alteredInput = alteredInput.replace(/(University)/, `***$1***`);

                alteredInput = alteredInput.replace(/(Degree)(.*?)(Degree)/, `***$1***$2${chatDetails.chatFilters.degree}`);
                alteredInput = alteredInput.replace(/(Branch)(.*?)(Branch)/, `***$1***$2${chatDetails.chatFilters.branch}`);
                alteredInput = alteredInput.replace(/(Year)(.*?)(Year)/, `***$1***$2${chatDetails.chatFilters.year}`);
                alteredInput = alteredInput.replace(/(Subject)(.*?)(Subject)/, `***$1***$2${chatDetails.chatFilters.subject}`);

                alteredInput = alteredInput.replace(/(Syllabus)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Unit)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Content)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Marking Scheme)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Marks Per Unit)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Main Questions Per Unit)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Sub Questions Per Main Question)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Marks Per Main Question)/, `***$1***`);
                alteredInput = alteredInput.replace(/(Average Blooms Score)/, `***$1***`);

                return (
                  <div key={index} className="w-full">
                    {/* Render the altered input message */}
                    <ChatBubble
                      role="User"
                      message={alteredInput}
                      mode={message.mode}
                    />
                    {/* {console.log(alteredInput)}  Debugging the altered message */}

                    {/* Render the response message */}
                    <ChatBubble
                      role="Bloomify"
                      message={message.response}
                      mode={message.mode}
                    />
                  </div>
                );
              })}
            </div>

          </div>
          {error && (
            <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
              <ErrorDisplay errorMessage={error} handleError={handleError} />
            </div>
          )}
          {showFeedbackForm && (
            <FeedbackForm
              feature="General"
              handleFeedbackCancel={handleFeedbackCancel}
              handleFeedbackSubmit={handleFeedbackSubmit}
              submitState={isSubmittingFeedback}
            />
          )}
        </div>
        <div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
            <p className="text-lg mb-8">
              We're sorry, but our platform is not supported on mobile devices.
            </p>
            <p className="text-lg">
              Please switch to a larger screen, such as a desktop or tablet, to
              access our platform.
            </p>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Chat;

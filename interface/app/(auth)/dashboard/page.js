"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import Image from "next/image";
import ErrorDisplay from "@components/ErrorDisplay";
import { IconInfoCircle } from "@tabler/icons-react";
import FeedbackForm from "@components/FeedbackForm";
import ChatButton from "@components/showOptions";
import { Tooltip } from 'react-tooltip'

const Dashboard = () => {
  const router = useRouter();
  const { status } = useSession();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/unauthenticated");
    }
  }, [status, router]); // Ensure this effect runs when the status changes

  const [userDetails, setUserDetails] = useState({
    username: "",
  });
  const [error, setError] = useState(null);

  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const [newChatDetails, setNewChatDetails] = useState({
    title: "",
    degree: "",
    branch: "",
    year: "",
    subject: "",
  });

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
        const { username } = details;
        setUserDetails({ username });
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
      }
    };

    fetchUserDetails();
  }, []); // No dependencies, runs only on component mount

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

    fetchFilteredChats(); // Fetch initial filtered chats
  }, [searchQuery]);

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

  const handleCreateNewChat = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChatDetails),
      });

      if (response.ok) {
        const { chatId } = await response.json();
        router.push(`/chat/${chatId}`);
      } else {
        setError("Failed to create chat.");
      }
    } catch (error) {
      setError("Error creating chat. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChatDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          columnName: "General",
          feedback: feedbackText,
        }),
      });
      setIsSubmittingFeedback(false);

      if (response.ok) {
        setShowFeedbackForm(false);
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
        <div className="xs:max-md:hidden bg-[#FFFAE3] w-screen h-screen overflow-y-scroll flex">
          <aside
            id="left-sidebar"
            className="border-r-2 border-black flex w-1/5 h-screen fixed transition-transform -translate-x-full sm:translate-x-0"
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
                    <a
                      href="#"
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
                    </a>
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
                        className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Settings
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleReportFeedback}
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] hover:text-white border-2 border-cerulean group"
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
          <div className="w-full bg-[#FFFAE3] h-full flex sm:pb-32 md:pb-0">
            <div className="w-5/6 flex flex-row justify-end items-center">
              <form
                onSubmit={handleCreateNewChat}
                className="bg-[#FFFAE3] flex flex-col justify-center gap-y-4 p-2 w-1/2 h-3/4"
              >
                <h2 className="text-4xl font-bold text-center">
                  Enter Chat Details
                </h2>
                <div className="font-Poppins font-medium">
                  <label className="block text-xl text-gray-700">
                    Chat Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Computer Networks Final Exam"
                    defaultValue="New Chat"
                    value={newChatDetails.title}
                    onChange={handleInputChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2"
                  />
                </div>
                <div className="font-Poppins font-medium">
                  <label className="block text-xl text-gray-700">Degree</label>
                  <input
                    type="text"
                    name="degree"
                    placeholder="Artificial Intelligence and Data Science"
                    value={newChatDetails.degree}
                    onChange={handleInputChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2"
                  />
                </div>

                <div className="font-Poppins">
                  <label className="block text-xl text-gray-700">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    placeholder="AI/DS"
                    value={newChatDetails.branch}
                    onChange={handleInputChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2"
                  />
                </div>

                <div className="font-Poppins">
                  <label className="block text-xl text-gray-700">Year</label>
                  <input
                    type="text"
                    name="year"
                    placeholder="Third Year"
                    value={newChatDetails.year}
                    onChange={handleInputChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2"
                  />
                </div>

                <div className="font-Poppins">
                  <label className="block text-xl text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Computer Networks"
                    value={newChatDetails.subject}
                    onChange={handleInputChange}
                    className="mt-1 block bg-transparent w-full border-black border-2 rounded-xl p-2"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-32 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#007991,45%,#BCD8C1,55%,#007991)] bg-[length:200%_100%] px-3 font-medium text-lightyellow transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  Create New Chat
                </button>
              </form>
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

export default Dashboard;

"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import DialogBox from "@components/DialogBox";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import { useRouter, useParams } from "next/navigation";
import ChatBubble from "@components/ChatBubble";
import Image from "next/image";

const Chat = () => {
	const router = useRouter()
	const { status } = useSession()
	// Redirect unauthenticated users
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/unauthenticated");
		}
	}, [status, router]); // Ensure this effect runs when the status changes

		const { id: chatId } = useParams()
		const [userDetails, setUserDetails] = useState({
			username: "",
			university: ""
		})
		const [chatFilters, setChatFilters] = useState({
			degree: "",
			branch: "",
			year: "",
			subject: "",
		});
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
		//Send Message Dropdown Logic
		const [isOpen, setIsOpen] = useState(false);
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
				const response = await fetch("/api/get-user-details", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const details = await response.json()
				const { username, university } = details
				setUserDetails({ username, university })
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
				if (response.ok) {
					const { chatTitle, chatFilters, chatHistory } = await response.json()
					setChatDetails((prevState) => ({
						...prevState,
						chatTitle,
						chatFilters,
						chatHistory,
					}));
	  
					setChatFilters(chatFilters)
				}

				if (response.status === 404) {
					router.push("/not-found")
				}
		
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
			toggleMenu()
		}

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
				<div className="xs:max-md:hidden bg-[#FFFAE3] w-screen h-screen flex">
					<aside
						id="left-sidebar"
						className="border-r-2 border-black flex w-1/5 h-dvh transition-transform -translate-x-full sm:translate-x-0"
						aria-label="Sidebar"
					>
						<div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
							<div>
								<Link
									href="/"
									className="flex items-center p-2 text-gray-900 rounded-lg group"
								>
									<Image src="/navbarlogo.svg" width={200} height={50} alt="Bloomify Logo" className="mb-5"/>
								</Link>
								<ul className="space-y-2 font-medium">
									<li>
										<Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group">
											<svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
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
											<Image src="/settingsicon.svg" width={20} height={20} alt="Settings Icon" />
											<span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
										</Link>
									</li>
								</ul>
								{/* Dropdowns */}
								<div className="bg-[#FFFAE3] mt-4">
									<div className="flex justify-between">
										<div className="w-1/2 gap-2">
											<select
												className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
												value={chatFilters.degree}
												name="degree"
												onChange={handleFilterChange}
											>
												<option value="Degree">Degree</option>
												<option value="BTech">BTech</option>
												<option value="MTech">MTech</option>
											</select>
										</div>
										<div className="w-1/2">
											<select
												className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
												value={chatFilters.branch}
												name="branch"
												onChange={handleFilterChange}
											>
												<option value="Branch">Branch</option>
												<option value="AI DS">AI DS</option>
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
												value={chatFilters.year}
												name="year"
												onChange={handleFilterChange}
											>
												<option value="Year">Year</option>
												<option value="SE">SE</option>
												<option value="TE">TE</option>
												<option value="BE">BE</option>
											</select>
										</div>
										<div className="w-1/2">
											<select
												className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
												value={chatFilters.subject}
												name="subject"
												onChange={handleFilterChange}
											>
												<option value="Subject">Subject</option>
												<option value="ANN">ANN</option>
												<option value="CS">CS</option>
												<option value="DS">DS</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div id="filtered-chats" className="h-full mt-10 overflow-y-auto">
								{filteredChats.map((chat, index) => (
									<div key={index} id="filtered-chat">
										<button className="bg-[#007991] text-white rounded-2xl border-2 border-black p-2 w-full mt-2" onClick={() => handleChatClick(chat._id)}>
											{chat.title}
										</button>
									</div>
								))}
							</div>
							<div id="left-bottom" className="gap-2 flex">
								<div className="">
									<SignoutButton />
								</div>
								<Link href="/settings" className="flex">
									<div className="text-xl font-bold">
										{userDetails.username}
									</div>
								</Link>
								<div className="absolute right-4 bottom-4">
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
										<DialogBox mode="classification" reloadChat={reloadChat} chatDetails={chatDetails} university={userDetails.university} />
										<DialogBox mode="suggestion" reloadChat={reloadChat} chatDetails={chatDetails} university={userDetails.university} />
										<DialogBox mode="generation" reloadChat={reloadChat} chatDetails={chatDetails} university={userDetails.university} />
									</div>
								)}
							</div>
						</div>
						<div className="bg-[#FFFAE3] flex flex-col flex-grow mt-4 p-4 overflow-y-auto">
							{/* Iterate over the chatHistory object and render chat bubbles */}
							{chatDetails.chatHistory?.map((message, index) => (
								<div key={index} className="w-full">
									{/* Render the input message */}
									<ChatBubble role="User" message={message.input} mode={message.mode} />
									{/* Render the response message */}
									<ChatBubble role="Bloomify" message={message.response} mode={message.mode} />
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
					<div className="text-center">
						<h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
						<p className="text-lg mb-8">We're sorry, but our platform is not supported on mobile devices.</p>
						<p className="text-lg">Please switch to a larger screen, such as a desktop or tablet, to access our platform.</p>
					</div>
				</div>
			</>
		);
	};
	return null
}

export default Chat;
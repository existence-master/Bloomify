"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SignoutButton from "@components/SignoutButton";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [userDetails, setUserDetails] = useState({
		username: "",
		university: ""
	})
	const [filteredChats, setFilteredChats] = useState([]);
	const [chatFilters, setChatFilters] = useState({
		degree: "Degree",
		branch: "Branch",
		year: "Year",
		subject: "Subject",
	});
	const [newChatDetails, setNewChatDetails] = useState({
		title: "",
		degree: "",
		branch: "",
		year: "",
		subject: ""
	})

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

		fetchUserDetails();
	}, []);

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

			const chats = await response.json();
			setFilteredChats(chats);
		};

		// Initial fetch for filtered chats
		fetchFilteredChats();
	}, [chatFilters]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setChatFilters((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChatClick = (chatId) => {
		router.push(`/chat/${chatId}`);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewChatDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const handleCreateNewChat = async (e) => {
		e.preventDefault(); // Prevent default form behavior

		try {
			// Send the form data to the API endpoint
			const response = await fetch('/api/create-chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newChatDetails), // Send the form state as JSON
			});

			if (response.ok) {
				console.log('Form submitted successfully!');
				const { chatId } = await response.json()
				console.log(chatId)
				router.push(`/chat/${chatId}`)
			} else {
				console.error('Failed to submit form.');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status !== "authenticated") {
		return <p>Access Denied</p>;
	}

	return (
		<div className="bg-[#FFFAE3] w-screen h-screen flex">
			<aside
				id="left-sidebar"
				className="border-r-2 border-black flex w-1/5 h-full transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
					<div>
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
									href="/"
									className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
								>
									<svg
										className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 18 16"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											stroke-width="2"
											d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
										/>
									</svg>
									<span className="flex-1 ms-3 whitespace-nowrap">Home</span>
								</Link>
							</li>
							<li>
								<Link
									href="/contactus"
									className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
								>
									<svg
										className="w-4 h-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 16"
									>
										<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
										<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
									</svg>
									<span className="flex-1 ms-3 whitespace-nowrap">
										Contact Us
									</span>
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
										name = "degree"
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
										name = "branch"
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
										name = "year"
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
										name = "subject"
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
								alt = "User Icon"
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
			<div className="p-8 w-full bg-[#FFFAE3] min-h-screen flex justify-center items-center">
			<form onSubmit={handleCreateNewChat} className="bg-[#FFFAE3] flex flex-col justify-between p-6 rounded-lg shadow-lg w-1/2 h-3/4">
				<h2 className="text-4xl font-bold mb-4">Enter Chat Details</h2>

				<div className="mb-4">
					<label className="block text-xl text-gray-700">Chat Title</label>
					<input
						type="text"
						name="title"
						value={newChatDetails.title}
						onChange={handleInputChange}
						className="mt-1 block w-full border-gray-300 rounded-md"
					/>
					</div>
					<div>
						<label className="block text-xl text-gray-700">Degree</label>
						<select
						name="degree"
						value={newChatDetails.degree}
						onChange={handleInputChange}
						className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
					>
						<option value="">Select</option>
						<option value="BTech">BTech</option>
						<option value="MTech">MTech</option>
					</select>
			</div>

			<div className="mb-4">
				<label className="block text-xl text-gray-700">Branch</label>
				<select
					name="branch"
					value={newChatDetails.branch}
					onChange={handleInputChange}
					className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="">Select</option>
					<option value="AI DS">AI DS</option>
					<option value="CS">CS</option>
					<option value="IT">IT</option>
					<option value="EnTC">EnTC</option>
				</select>
			</div>

			<div className="mb-4">
				<label className="block text-xl text-gray-700">Year</label>
				<select
					name="year"
					value={newChatDetails.year}
					onChange={handleInputChange}
					className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="">Select</option>					
					<option value="SE">SE</option>
					<option value="TE">TE</option>
					<option value="BE">BE</option>
				</select>
			</div>

			<div className="mb-4">
				<label className="block text-xl text-gray-700">Subject</label>
				<select
					name="subject"
					value={newChatDetails.subject}
					onChange={handleInputChange}
					className="block w-full p-2 text-gray-900 bg-transparent shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="">Select</option>				
					<option value="ANN">ANN</option>
					<option value="CS">CS</option>
					<option value="DS">DS</option>
				</select>
			</div>

				<button
					type="submit"
					className="bg-[#007991] w-full text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					Create New Chat
				</button>
			</form>
		</div>
		</div>
	);
};

export default Dashboard;

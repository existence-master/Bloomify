"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignoutButton from "@components/SignoutButton";

const Settings = () => {
   const [userDetails, setUserDetails] = useState({
		username: "",
	  	googleUser: null
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
		 const {username, googleUser} = details
		  setUserDetails({username, googleUser})
	  }
	  fetchUserDetails()
	 }, [])

   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const handlePassFieldChange = (e) => {
	  const { name, value } = e.target;
	  if (name === "currentPassword") setCurrentPassword(value);
	  else if (name === "newPassword") setNewPassword(value);
   };

   const handlePassFieldSubmit = async (e) => {
	  e.preventDefault();
	  try {
		 const response = await fetch("/api/change-password", {
			method: "POST",
			headers: {
			   "Content-Type": "application/json",
			},
			body: JSON.stringify({ currentPassword, newPassword }),
		 });
		 if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message);
		 }
		 // Password updated successfully
		 setCurrentPassword("");
		 setNewPassword("");
		 setErrorMessage("");
	  } catch (error) {
		 setErrorMessage(error.message);
	  }
   };

   const [newUsername, setNewUsername] = useState('');
   const [userMessage, setUserMessage] = useState('');
   const [userError, setUserError] = useState('');
   // Function to handle form submission
   const handleUsernameSubmit = async (event) => {
	  event.preventDefault(); // Prevent default form submission

	  try {
	  // Make API call to change username
	  const response = await fetch('/api/change-username', {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify({ newUsername }),
	  });

	  // Check if API call was successful
	  if (response.ok) {
		 const data = await response.json();
		 setUserMessage(data.message); // Set success message
	  } else {
		 const errorData = await response.json();
		 setUserError(errorData.message); // Set error message
	  }
	  } catch (error) {
	  console.error('Error changing username:', error);
	  setUserError('Internal server error'); // Set generic error message
	  }
   };

   const handleUsernameFormChange = (event) => {
	  setNewUsername(event.target.value); // Update new username state
   };

   // Fetch user details useEffect remains the same

   return (
	<>
	  <div className="xs:max-md:hidden bg-[#FFFAE3] w-screen h-screen flex">
		 <aside
				id="left-sidebar"
				className="border-r-2 border-black flex w-1/5 h-full transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
					<div>
						<Image src="/navbarlogo.svg" width={200} height={50} alt="Bloomify Logo" className="mb-5"/>
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
											strokeWidth="2"
											d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
										/>
									</svg>
									<span className="flex-1 ms-3 whitespace-nowrap">Home</span>
								</Link>
							</li>
							<li>
								<Link
									href="/settings"
									className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
								>
									<Image src="/settingsicon.svg" width={20} height={20} alt="Settings Icon"/>
									<span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
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
					</div>
					<div id="left-bottom" className="gap-2 flex">
						<div>
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
		 <div id="right-area" className="w-full h-full flex flex-col justify-center items-center">
			<h1 className="mb-10 text-5xl font-bold font-poppins">
			   Settings
			</h1>
			<div className="w-1/2 mb-10 flex justify-center items-center">
			   <form onSubmit={handlePassFieldSubmit} className="text-2xl font-poppins gap-5 w-full h-full flex flex-col justify-center items-center">
				  <div className="mb-4 w-full">
					 <label htmlFor="currentPassword" className="font-semibold mb-2 flex">Current Password:</label>
					 <input
						type="password"
						id="currentPassword"
						name="currentPassword"
						value={currentPassword}
						onChange={handlePassFieldChange}
						className="w-full bg-transparent rounded-xl border-2 border-black"
					 />
				  </div>
				  <div className="mb-4 w-full">
					 <label htmlFor="newPassword" className="font-semibold mb-2 flex">New Password:</label>
					 <input
						type="password"
						id="newPassword"
						name="newPassword"
						value={newPassword}
						onChange={handlePassFieldChange}
						className="w-full bg-transparent rounded-xl border-2 border-black"
					 />
					 <span className="text-sm text-gray-400 mt-2 mb-2 flex">This field is only applicable for Non-Google Users</span>
				  </div>
				  <div>
					 <button type="submit" className="drop-shadow-lg bg-[#007991] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl border-2 border-black">
						Change Password
					 </button>
				  </div>
				  {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
			   </form>
			</div>
			<div className="w-1/2 flex justify-center items-center mt-8">
			   <form onSubmit={handleUsernameSubmit} className="text-2xl font-poppins w-full h-full flex flex-col justify-center items-center">
				  <div className="mb-4 p-4 w-full">
					 <label htmlFor="newUsername" className="font-semibold mb-2 flex">New Username:</label>
					 <input
						type="text"
						id="newUsername"
						name="newUsername"
						value={newUsername}
						onChange={handleUsernameFormChange}
						required
						className="bg-transparent w-full rounded-xl border-2 border-black"
					 />
				  </div>
				  <button type="submit" className="drop-shadow-lg bg-[#007991] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl border-2 border-black">Change Username</button>
				  {userMessage && <p className="text-sm text-black">{userMessage}</p>}
				  {userError && <p className="text-sm text-black">{userError}</p>}
			   </form>
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

export default Settings;
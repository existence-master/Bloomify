"use client"; // This component runs on the client-side in Next.js

import { useRouter, useSearchParams } from "next/navigation"; // Navigation and URL search params hook for routing
import { useState, useEffect } from "react"; // React hook for component state
import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Link component for client-side navigation
import { getCookie } from "cookies-next"; // Function to get a cookie in Next.js
import { useSession } from "next-auth/react"; // Next.js authentication hook

const ChangePassword = () => {
	const [error, setError] = useState(""); // State to hold error messages
	const [success, setSuccess] = useState(""); // State to hold success messages
	const [isAuthorized, setIsAuthorized] = useState(false); // State to track authorization status
	const router = useRouter(); // Router for navigation
	const searchParams = useSearchParams(); // Hook to access URL search parameters

	const { status } = useSession(); // Hook to get the current session status

	// If the user is authenticated, redirect to the dashboard
	if (status === "authenticated") {
		router.push("/dashboard");
	}

	useEffect(() => {
		// Check the "forgotpasswordflow" cookie to determine if the user is authorized
		const forgotPasswordFlowCookie = getCookie("forgot-password-flow"); // Retrieve the "forgotpasswordflow" cookie

		if (forgotPasswordFlowCookie === "true") {
			setIsAuthorized(true); // Mark as authorized if any of the conditions are met
		} else {
			router.push("/login"); // Redirect to the signup page if not authorized
		}
	}, [router, searchParams]); // Dependency array ensures the effect runs when the component mounts or searchParams changes

	// If the user is not authorized, don't render the component
	if (!isAuthorized) {
		return null; // Return null to prevent unauthorized users from seeing the component
	}

	const userEmail = searchParams.get("userEmail"); // Get user email from URL params

	// Function to validate password strength
	const isValidPassword = (password) => {
		return password.length >= 8; // Basic validation: password should be at least 8 characters long
	};

	// Handle form submission for changing password
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		const newPassword = e.target[0].value; // Get the new password from the form input

		// Validate password
		if (!isValidPassword(newPassword)) {
			setError("Password must be at least 8 characters long."); // Set error message for invalid password
			return;
		}

		// Make API call to change the password
		const res = await fetch("/api/change-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userEmail, newPassword }),
		});

		if (res.ok) {
			setSuccess("Password changed successfully!"); // Set success message
			setTimeout(() => {
				router.push("/login"); // Redirect to login page after success
			}, 3000); // Redirect after 3 seconds
		} else {
			setError("Failed to change password. Please try again."); // Set error message for failed request
		}
	};

	return (
		<>
			<div className="xs:max-md:hidden">
				{" "}
				{/* Ensure this section is only shown on larger screens */}
				<div className="h-screen w-screen flex">
					{" "}
					{/* Full-screen flex container */}
					<div id="left" className="h-full w-1/2 bg-blue-300">
						{" "}
						{/* Left half with an image */}
						<img
							className="h-full w-full object-cover" // Image takes full height and width
							src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg"
							alt="books" // Image description for accessibility
						/>
					</div>
					<div
						id="right"
						className="h-screen w-1/2 bg-[#FFFAE3] flex flex-col justify-center items-center"
					>
						{" "}
						{/* Right half for change password form */}
						<div className="h-full w-full flex">
							{" "}
							{/* Full-height and full-width flex container */}
							<div className="w-full flex flex-col justify-center items-center">
								{" "}
								{/* Centered content */}
								<Image
									src="/navbarlogo.svg" // Logo source
									width={200} // Logo width
									height={50} // Logo height
									alt="Bloomify Logo" // Logo description
									className="mb-10" // Bottom margin
								/>
								<h1 className="text-3xl font-medium text-black mb-5 font-poppins">
									Change Password
								</h1>{" "}
								{/* Section heading */}
								<form onSubmit={handleSubmit} className="w-1/2">
									{" "}
									{/* Form for changing password */}
									<h1 className="text-black mt-5 mb-2 text-xl">
										New Password
									</h1>{" "}
									{/* Label for new password input */}
									<input
										type="password" // Password input type
										className="focus:border-blue-500 w-full border-2 border-black rounded-lg bg-transparent text-black h-10 p-2" // Styling
										placeholder="********" // Placeholder for password input
										required // Required field
									/>
									<div className="flex flex-col justify-center items-center mt-5">
										<button
											className="text-white hover:shadow-lg rounded-lg w-1/2 text-xl font-semibold bg-[#007991] p-2 mb-1" // Submit button styling
											type="submit" // Submit the form
										>
											Change Password
										</button>{" "}
										{/* Submit button text */}
										{error && (
											<p className="text-red-600 text-[16px] mt-2">
												{error}
											</p>
										)}{" "}
										{/* Display error message if exists */}
										{success && (
											<p className="text-green-600 text-[16px] mt-2">
												{success}
											</p>
										)}{" "}
										{/* Display success message if exists */}
									</div>
								</form>{" "}
								{/* End of form */}
								<h1 className="text-black mt-5 mb-5">
									Remembered your password?{" "}
									{/* Prompt for users who remember their password */}
									<Link
										className="text-[#007991] font-medium hover:underline" // Link styling with hover effect
										href="/login" // Link to the login page
									>
										Login
									</Link>
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
				{" "}
				{/* Section for unsupported devices */}
				<div className="text-center">
					{" "}
					{/* Centered text container */}
					<h1 className="text-3xl font-bold mb-4">
						Unsupported Device
					</h1>{" "}
					{/* Heading */}
					<p className="text-lg mb-8">
						We're sorry, but our platform is not supported on mobile
						devices.
					</p>{" "}
					{/* Message for unsupported devices */}
					<p className="text-lg">
						Please switch to a larger screen, such as a desktop or
						tablet, to access our platform.
					</p>{" "}
					{/* Suggestion to use larger screens */}
				</div>
			</div>
		</>
	);
};

export default ChangePassword; // Export the change password component
"use client"; // Indicates that this component runs on the client-side in Next.js
import { signIn, useSession } from "next-auth/react"; // Next.js authentication hooks
import { useRouter } from "next/navigation"; // Navigation utilities in Next.js
import { useEffect, useState } from "react"; // React hooks for state management and side effects
import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Link component for client-side navigation
import ErrorDisplay from "@components/ErrorDisplay";

const Signup = () => {
	const [error, setError] = useState(""); // State to hold error messages
	const router = useRouter(); // Instance of the Next.js router
	const session = useSession(); // Hook to get current user session status

	useEffect(() => {
		// Redirect to dashboard if the user is already authenticated
		if (session?.status === "authenticated") {
			router.push("/dashboard");
		}
	}, [session, router]); // Dependency array ensures the effect runs when session or router changes

	// Function to validate email addresses using a regular expression
	const isValidEmail = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email regex pattern
		return emailRegex.test(email); // Test the email against the regex pattern
	};

	// Handle form submission for signing up
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		const userEmail = e.target[0].value; // Get the email from the first form input
		const password = e.target[1].value; // Get the password from the second form input

		// Validate the email address
		if (!isValidEmail(userEmail)) {
			setError("Email is invalid"); // Set error message if the email is invalid
			return;
		}

		// Validate the password length
		if (!password || password.length < 8) {
			setError("Password is invalid"); // Set error message if the password is invalid
			return;
		}

		try {
			// Set the "signup-flow" cookie to indicate the user has started the signup process
			let response = await fetch("/api/set-cookie", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "signup-flow", // Cookie name
					value: "true", // Cookie value
				}),
			});

			// Make API call to set user session
			response = await fetch("/api/set-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Content type is JSON
				},
				body: JSON.stringify({
					userEmail,
					password,
				}),
			});

			// If the response is successful, redirect to the email verification page
			if (response.ok) {
				router.push(`/verify?userEmail=${userEmail}`); // Redirect to verify page with email parameter
			}
		} catch (error) {
			setError("An error occurred. Please try again."); // Set error message for exception handling
		}
	};

	const handleSignUpWithGoogle = async () => {
		try {
			// Set the "signup-flow" cookie to indicate the user has started the signup process
			let response = await fetch("/api/set-cookie", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: "signup-flow", // Cookie name
					value: "true", // Cookie value
				}),
			});

			signIn("google");
		} catch (error) {
			setError("An error occurred. Please try again."); // Set error message for exception handling
		}
	};

	const handleError = () => {
		setError(null);
	};

	return (
		<>
			{/* Main container with flex layout */}
			<div className="xs:max-md:hidden h-screen w-screen flex">
				{/* Left side with an image */}
				<div className="h-full w-1/2">
					<img
						className="h-full w-full object-cover" // Image styling
						src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" // Image source
						alt="Books" // Image description for accessibility
					/>
				</div>
				{/* Right side for the signup form */}
				<div className="h-screen w-1/2 bg-[#FFFAE3]">
					{" "}
					{/* Background color for the right side */}
					<div className="h-full w-full flex flex-col justify-center items-center">
						{" "}
						{/* Flex layout for centering */}
						<Image
							className="mb-10" // Bottom margin
							src="/navbarlogo.svg" // Logo source
							alt="Bloomify logo" // Alternative text for the image
							width={200} // Width of the image
							height={50} // Height of the image
						/>
						<div className="w-1/2 flex flex-col justify-center items-center">
							{" "}
							{/* Container for the form */}
							<h1 className="text-3xl font-medium text-black mb-5">
								{" "}
								{/* Heading for the form */}
								Create Account
							</h1>
							<form
								onSubmit={handleSubmit}
								className="w-full font-poppins"
							>
								{" "}
								{/* Signup form */}
								<h1 className="text-black text-xl mt-5 mb-2">
									Email
								</h1>{" "}
								{/* Label for email input */}
								<input
									type="text" // Input type
									className="w-full form-control border-black border-2 rounded-lg bg-[#FFFAE3] text-black mb-5 h-10 p-2" // Styling
									placeholder="abc@gmail.com" // Placeholder text
									required // Mark as required
								/>
								<h1 class="text-black text-xl mt-5 mb-2">
									Password
								</h1>{" "}
								{/* Label for password input */}
								<input
									type="password" // Input type for password
									className="w-full form-control border-2 border-black rounded-lg bg-[#FFFAE3] text-black mb-5 h-10 p-2" // Styling
									placeholder="********" // Placeholder for the password
									required // Mark as required
								/>
								<div className="flex flex-col justify-center items-center mb-10">
									{" "}
									{/* Container for extra information */}
									<h1 className="text-black mb-4">
										{" "}
										{/* Prompt for existing users */}
										Already have an account?{" "}
										<Link
											className="text-blue-600 font-medium hover:underline" // Link styling
											href="/login" // Link to login page
										>
											Login here
										</Link>
									</h1>
									<button
										className="text-white w-40 hover:shadow-lg rounded-lg text-xl p-2 font-semibold bg-[#007991]" // Styling for the button
										type="submit" // Submit the form
									>
										Create Account
									</button>{" "}
									{/* Button to create an account */}
								</div>
							</form>
							{/* Alternative signup option with Google */}
							<div className="text-center text-black mb-5">
								Or
							</div>{" "}
							{/* Separator */}
							<button
								className="text-xl w-full bg-transparent text-black py-2 rounded-xl border-2 border-black flex flex-row justify-center items-center" // Styling
								onClick={handleSignUpWithGoogle} // Google sign-in handler
							>
								<Image
									src="/googlelogo.webp"
									width={20}
									height={20}
									alt="Google logo"
									className="mr-2"
								/>{" "}
								{/* Google logo */}
								Sign up with Google
							</button>
						</div>{" "}
						{/* End of form container */}
					</div>{" "}
					{/* End of right side content */}
				</div>{" "}
				{/* End of right side */}
				{error && ( // If there is an error message, show the error display
					<div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
						{" "}
						{/* Error display styling */}
						<ErrorDisplay
							errorMessage={error}
							handleError={handleError}
						/>{" "}
						{/* Custom error component */}
					</div>
				)}
			</div>{" "}
			{/* End of main container */}
			{/* Section for unsupported devices */}
			<div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
				{" "}
				{/* Styling for the full-screen flex layout */}
				<div className="text-center">
					{" "}
					{/* Centered content */}
					<h1 className="text-3xl font-bold mb-4">
						Unsupported device
					</h1>{" "}
					{/* Heading for unsupported devices */}
					<p className="text-lg mb-8">
						We're sorry, but our platform is not supported on mobile
						devices.
					</p>{" "}
					{/* Explanation for unsupported devices */}
					<p className="text-lg">
						Please switch to a larger screen, such as a desktop or
						tablet, to access our platform.
					</p>{" "}
					{/* Suggestion to use a larger screen */}
				</div>
			</div>{" "}
			{/* End of unsupported device section */}
		</>
	);
};

export default Signup; // Export the Signup component

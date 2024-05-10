"use client"; // This component uses client-side rendering
import React from "react"; // Import React
import Link from "next/link"; // For client-side navigation
import { signOut, useSession } from "next-auth/react"; // For managing authentication sessions
import { useRouter } from "next/navigation"; // For programmatic navigation

// The Navbar component represents a simple navigation bar with links and a logout button when a user is signed in
const Navbar = () => {
	const { data: session } = useSession(); // Get the session data from NextAuth
	const router = useRouter(); // Get the router for navigation
	
	return (
		<div>
			<ul className="absolute justify-between m-4 ml-7 item-center "> {/* Main navigation container */}
				<div className="flex justify-between m-4 ml-7 item-center"> {/* Flex container for alignment */}
					<div>
						<Link href="/"> {/* Link to home page */}
							<li className="mr-7">Home</li> {/* Home navigation item */}
						</Link>
					</div>
					<div className="flex gap-10"> {/* Flex container for navigation items */}
						{!session ? (
							// If there is no active session, display Login and Sign Up links
							<>
								<Link href="/login"> {/* Link to login page */}
									<li>Login</li> {/* Login navigation item */}
								</Link>
								<Link href="/signup"> {/* Link to sign-up page */}
									<li>Sign Up</li> {/* Sign-up navigation item */}
								</Link>
							</>
						) : (
							// If there is an active session, display user info and logout button
							<>
								{session.user?.email} {/* Display the user's email */}
								<li> {/* Navigation item for logout */}
									<button
										onClick={() => { // On click, sign out and redirect to home
											signOut(); // Call the sign-out function
										}}
										className="p-2 px-5 -mt-1 bg-blue-800 rounded-full" // Button styling
									>
										Logout {/* Button text */}
									</button>
								</li>
							</>
						)}
					</div>
				</div>
			</ul> {/* End of main navigation container */}
		</div> // End of component
	);
};

export default Navbar; // Export the Navbar component
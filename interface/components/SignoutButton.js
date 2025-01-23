// SignoutButton.js

import { signOut } from "next-auth/react"; // Importing signOut function from NextAuth
import Image from "next/image"; // Importing Image component from Next.js

// The SignoutButton component provides a clickable icon to sign out the user
const SignoutButton = () => {
	// Function to handle the sign-out process
	const handleSignout = async () => {
		try {
			await signOut({ callbackUrl: "/" }); // Sign out and redirect to the specified callback URL
		} catch (error) {
			// You could add additional error handling here, like displaying a message to the user
		}
	};

	// Returning a div containing the sign-out icon
	return (
		<div onClick={handleSignout} className="relative w-[30px] h-[30px]">
			{" "}
			{/* Container for the sign-out icon */}
			<Image
				src="/signout.svg" // Path to the sign-out icon
				className="cursor-pointer" // Changes cursor style to indicate interactivity
				width={40} // Width of the icon
				height={40} // Height of the icon
				alt="Sign out" // Alternative text for accessibility
			/>
		</div>
	);
};

export default SignoutButton; // Exporting the SignoutButton component

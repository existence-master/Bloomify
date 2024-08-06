import "./globals.css"; // Import global CSS
import AuthProvider from "@components/AuthProvider"; // Import AuthProvider component
import { getServerSession } from "next-auth"; // Import NextAuth function to fetch the server-side session
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
	title: "Bloomify", // Title for the website
	description: "AI Based Assessment Creator For Teachers", // Description for the website
};

export default async function RootLayout({ children }) {
	const session = await getServerSession(); // Get the server-side session

	return (
		<html lang="en">
			{" "}
			{/* Set the language for the HTML document */}
			<head>
				{" "}
				{/* Head section for metadata and resources */}
				<link rel="icon" href="/favicon.ico" />{" "}
				{/* Favicon for the website */}
			</head>
			<body>
				{" "}
				{/* Body of the HTML document */}
				<AuthProvider session={session}>
					{" "}
					{/* Provide authentication context */}
					{children}{" "}
					{/* Render the child components within the layout */}
					<Analytics />
				</AuthProvider>
			</body>
		</html>
	);
}
import { useState } from "react"; // React hook for managing component state
import Image from "next/image"; // Component for displaying images in Next.js
import MarkdownRenderer from "@components/MarkdownRenderer"; // Component for rendering markdown content

const ChatBubble = ({ role, message, mode }) => {
	const [isCopied, setIsCopied] = useState(false); // State to track whether the message has been copied
	const isUser = role === "User"; // Determine if the chat bubble is from a user
	const alignClass = isUser ? "justify-end" : "justify-start"; // Alignment class based on user role
	const bubbleAlignClass = isUser ? "self-end" : "self-start"; // Alignment class for the chat bubble

	// Function to copy the message to the clipboard
	const copyToClipboard = () => {
		navigator.clipboard.writeText(message); // Copy the message text to the clipboard
		setIsCopied(true); // Set the copied state to true
		setTimeout(() => {
			setIsCopied(false); // Reset the copied state after 1.5 seconds
		}, 1500); // Timeout duration
	};

	// Function to download the response as a PDF
	const downloadDOCX = async () => {
		try {
			const response = await fetch("/api/generate-docx", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ markdown: message }),
			});

			if (!response.ok) {
				throw new Error("Failed to generate DOCX");
			}

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "Generated Paper.md";
			document.body.appendChild(a);
			a.click();
			a.remove();
		} catch (error) { }
	};

	const downloadPDF = async () => {
		try {
		  const response = await fetch("/api/generate-pdf", { // Adjust the endpoint as needed
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({ markdown: message }), // Use the same message variable
		  });
	  
		  if (!response.ok) {
			throw new Error("Failed to generate PDF");
		  }
	  
		  const blob = await response.blob();
		  const url = window.URL.createObjectURL(blob);
		  const a = document.createElement("a");
		  a.href = url;
		  a.download = "Generated Paper.pdf"; // Set the desired file name
		  document.body.appendChild(a);
		  a.click();
		  a.remove();
		  window.URL.revokeObjectURL(url); // Clean up the URL object
		} catch (error) {
		  console.error("Error downloading PDF:", error); // Log the error for debugging
		}
	  };

	return (
		<div className={`flex items-start gap-2.5 mb-2 ${alignClass}`}>
			{/* Container for chat bubble */}
			{/* Display the copy button for user messages */}
			{isUser && (
				<button
					className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
					type="button"
					onClick={copyToClipboard}
				>
					{isCopied ? "Copied" : "Copy"}{" "}
					{/* Display "Copied" or "Copy" based on state */}
				</button>
			)}
			{/* Main chat bubble */}
			<div
				className={`bg-[#BCD8C1] border-2 border-gray-400 flex flex-col leading-1.5 p-4 rounded-xl ${bubbleAlignClass} ${mode === "Generation" && !isUser ? "w-min" : "w-1/3"
					}`}
			>
				{/* Chat bubble container */}
				{/* Display the mode icon and label */}
				<div className="flex items-center space-x-2 rtl:space-x-reverse">
					{/* Icon and mode label */}
					{/* Display icon and label based on message mode */}

					{mode === "Classification" && (
						<>
							<Image
								src="/classifyicon.svg" // Icon for classification mode
								alt="Classify Icon" // Alt text
								width={24} // Width
								height={24} // Height
							/>
							<span className="text-xl font-semibold text-gray-900">
								Classify
							</span>{" "}
							{/* Mode label */}
						</>
					)}
					{/* Suggestion mode */}
					{mode === "Suggestion" && (
						<>
							<Image
								src="/suggesticon.svg" // Icon for suggestion mode
								alt="Suggest Icon" // Alt text
								width={24} // Width
								height={24} // Height
							/>
							<span className="text-xl font-semibold text-gray-900">
								Suggest
							</span>{" "}
							{/* Mode label */}
						</>
					)}
					{/* Generation mode */}
					{mode === "Generation" && (
						<>
							<Image
								src="/generateicon.svg" // Icon for generation mode
								alt="Generate Icon" // Alt text
								width={24} // Width
								height={24} // Height
							/>
							<span className="text-xl font-semibold text-gray-900">
								Generate
							</span>{" "}
							{/* Mode label */}
						</>
					)}

					{mode === "Generation" && !isUser && (
						<div className="ml-4 text-sm text-gray-700">
							<p>
								Please install the Writage plugin to open and edit Word files. You can download it from the
								<a href="https://www.writage.com/download/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
									Writage Download Page
								</a>.
							</p>
						</div>
					)}
				</div>{" "}
				{/* End of icon and mode label section */}
				{/* Display the message content using MarkdownRenderer */}
				<pre className="whitespace-pre-wrap text-x font-normal py-2.5 text-gray-900">
					<MarkdownRenderer message={message} />{" "}
					{/* Render the message content */}
				</pre>{" "}
				{/* End of message content */}
			</div>{" "}
			{/* End of chat bubble */}
			{/* Display the download DOCX button for messages in "Generation" mode */}
			{mode === "Generation" && !isUser && (
				<div className="mb-2"> {/* Added margin for spacing */}
					<button
						className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
						type="button"
						onClick={downloadDOCX}
					>
						Download Paper
					</button>
				</div>
			)}
			{/* Display the user icon for user messages */}
			{isUser && (
				<Image
					src="/user.svg" // Path to the user icon
					alt="User  Icon" // Alt text for the icon
					width={24} // Width
					height={24} // Height
					className="rounded-full bg-gray-200 p-1" // Styling for the icon
				/>
			)}
			{!isUser && (
				<button
					className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
					type="button"
					onClick={copyToClipboard}
				>
					{isCopied ? "Copied" : "Copy"}{" "}
					{/* Display "Copied" or "Copy" based on state */}
				</button>
			)}
		</div>
	);
};

export default ChatBubble; // Export the ChatBubble component

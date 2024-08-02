"use client"; // Error components must be Client Components

import { useEffect } from "react"; // React hook for handling side effects

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service or console
	}, [error]); // Dependency array with 'error' to trigger on error change

	return (
		<div className="bg-[#FFFAE3] w-screen h-screen flex flex-col justify-center items-center">
			{" "}
			{/* Background and layout styles */}
			<h2 className="text-4xl text-red-500 font-semibold mb-4">
				Something went wrong!
			</h2>{" "}
			{/* Error message */}
			<button
				onClick={reset} // Callback to reset the component and attempt recovery
				className="rounded-xl border-2 border-black bg-[#007991] p-2 mb-2 text-white" // Styling for the button
			>
				Try again
			</button>
			<button
				onClick={() => window.history.back()} // Callback to go back to the previous page
				className="rounded-xl border-2 border-black bg-[#007991] p-2 mb-2 text-white" // Styling for the button
			>
				Go back
			</button>
		</div>
	);
}

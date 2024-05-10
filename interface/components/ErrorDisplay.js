"use client"; // This component uses client-side rendering

import { useState } from 'react'; // React hook for managing state

// ErrorDisplay component is used to display an error message in a modal-like format.
// It provides a dismiss button to close the error message and invokes a callback to handle further error processing.
const ErrorDisplay = ({ errorMessage, handleError }) => {
	const [visible, setVisible] = useState(true); // State to manage the visibility of the error message

	// Function to handle dismissing the error message
	const handleDismiss = () => {
		setVisible(false); // Set visibility to false, hiding the error message
		handleError(); // Call the external error handling function
	};

	return (
		<>
			{visible && ( // Display only if visible is true
				<div className="flex flex-col w-[400px] justify-center items-center bg-white rounded-xl border-2 border-black p-2"> {/* Error container */}
					<p className='text-xl text-red-600 mb-4'>{errorMessage}</p> {/* Display the error message */}
					<button 
						onClick={handleDismiss} // Call handleDismiss on button click
						className='rounded-xl bg-[#007991] p-2 text-white mb-4 border-2 border-black' // Button styling
					>
						Dismiss {/* Button label */}
					</button>
				</div>
			)}
		</>
	);
};

export default ErrorDisplay; // Export the ErrorDisplay component

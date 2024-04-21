"use client";

import { useState } from "react";

<<<<<<< HEAD:interface/src/components/DialogBox-classify.tsx
const DialogBox = () => {
  // const client = useClient();
  const [userInput, setUserInput] = useState(""); // State variable for user input
  const [modelResponse, setModelResponse] = useState(""); // State variable for model response
=======
const DialogBox = ({mode = "classification"}) => {
>>>>>>> 3fe1d3d79585f7d740ba7d3154e5ef80b6bc1028:interface/src/components/DialogBox.tsx
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(mode === "classification" ? { "question": "" } : { "question": "", "desired_level": "" }); //Conditional state for easy query handling
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState("");

  const url = mode === "classification" ? "http://localhost:5000/classify" : "" // Conditional url

  const openDialog = () => {
    setIsOpen(true);
  };

  /*
  const classificationForm = TSX // Can declare like this instead of return
  */

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input event fired"); // Log to check if the function is called
    const inputValue = e.target.value;
    if (mode === "classification") {
      setQuery(prevState => ({
        ...prevState,
        question: inputValue
      }));
    } else {
      // Handle other modes or set the query to a different value
    }    
  };

  const closeDialog = () => {
    setIsOpen(false);
    ("");
    setResponseText("");
  };

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(query), // Send user input in the specified format
      });

      if (!response.ok) {
        throw new Error("Failed to send query");
      }

      const responseData = await response.text();
      setModelResponse(responseData); // Update model response
      setUserInput(message); // Update user input
      setResponseText(responseData);
      console.log("Query sent successfully");
      console.log("Response:", responseData); // Print response text
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeDialog();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={openDialog}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Classify
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {mode === "classification"
                ? 
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:flex-col sm:items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Enter your question
              </h3>
              <input
                type="text"
                value={query.question}
                onChange={handleInput}
                className="mt-2 w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
                </div>
                :
                <div><h3>Suggestion Form</h3></div> // Conditional rendering according to mode
            } 
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={sendMessage}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Send
                </button>
                <button
                  onClick={closeDialog}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogBox;

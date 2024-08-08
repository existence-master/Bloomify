"use client"; // This component is client-side in Next.js

import { useState, useEffect } from "react"; // React hooks for state management and side effects
import Link from "next/link"; // Link component for client-side navigation
import Image from "next/image"; // Next.js optimized image component
import SignoutButton from "@components/SignoutButton"; // Component for signing out
import ErrorDisplay from "@components/ErrorDisplay"; // Component to display error messages
import { IconInfoCircle } from "@tabler/icons-react";
import FeedbackForm from "@components/FeedbackForm";

const Settings = () => {
  // State for various form inputs and error handling
  const [currentPassword, setCurrentPassword] = useState(""); // State for the current password input
  const [newPassword, setNewPassword] = useState(""); // State for the new password input
  const [error, setError] = useState(null); // State for error messages
  const [newUsername, setNewUsername] = useState(""); // State for the new username input
  const [userMessage, setUserMessage] = useState(""); // State for user messages (e.g., success message)
  const [userDetails, setUserDetails] = useState({
    username: "",
    googleUser: null, // Information about whether the user is a Google user
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/get-user-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle response errors
        if (!response.ok) {
          throw new Error(
            `Failed to fetch user details: ${response.statusText}`
          );
        }

        // Update user details state with fetched data
        const details = await response.json();
        const { username, googleUser } = details;
        setUserDetails({ username, googleUser });
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`); // Set error message on failure
      }
    };

    fetchUserDetails(); // Fetch user details when the component mounts
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle changes to password input fields
  const handlePassFieldChange = (e) => {
    const { name, value } = e.target; // Get the field name and value
    if (name === "currentPassword") {
      setCurrentPassword(value); // Update state for current password
    } else if (name === "newPassword") {
      setNewPassword(value); // Update state for new password
    }
  };

  // Handle password change form submission
  const handlePassFieldSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send request to change password
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }), // Pass the current and new passwords
      });

      // Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw error if response is not OK
      }

      // Reset the form fields and clear error messages after successful password change
      setCurrentPassword("");
      setNewPassword("");
      setError(""); // Clear the error state
    } catch (error) {
      setError("Error changing password."); // Set error message for failure
    }
  };

  // Handle changes to the username input field
  const handleUsernameFormChange = (event) => {
    setNewUsername(event.target.value); // Update state with the new username
  };

  // Handle username change form submission
  const handleUsernameSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Make API call to change the username
      const response = await fetch("/api/change-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newUsername }), // Pass the new username
      });

      // Check if the API call was successful
      if (response.ok) {
        const data = await response.json();
        setUserMessage(data.message); // Set a success message
      } else {
        const errorData = await response.json();
        setError("Error changing username."); // Set error if response is not OK
      }
    } catch (error) {
      setError("Internal server error"); // Set a generic error message for failure
    }
  };

  const handleReportFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = async (feedbackText) => {
    try {
      setIsSubmittingFeedback(true);
      const response = await fetch("/api/update-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnName: "General",
          feedback: feedbackText,
        }),
      });
      setIsSubmittingFeedback(false);

      if (response.ok) {
        setShowFeedbackForm(false);
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFeedbackCancel = () => {
    setShowFeedbackForm(false);
  };

  // Function to clear the error state
  const handleError = () => {
    setError(null); // Clear the error message
  };

  return (
    <>
      <div className="xs:max-md:hidden bg-[#FFFAE3] w-screen h-screen flex">
        {/* Container for the settings page */}
        <aside
          id="left-sidebar" // Sidebar for navigation and user information
          className="border-r-2 border-black flex w-1/5 h-full transition-transform -translate-x-full sm:translate-x-0" // Sidebar styling
          aria-label="Sidebar" // Accessibility label
        >
          <div className="w-full h-full px-3 py-4 flex flex-col justify-between overflow-y-auto bg-[#FFFAE3]">
            {/* Sidebar content */}
            <div>
              {/* Top section for navigation links */}
              <Link
                href="/" // Link to the home page
                className="flex items-center p-2 text-gray-900 rounded-lg group" // Link styling
              >
                <Image
                  src="/navbarlogo.svg"
                  width={200}
                  height={50}
                  alt="Bloomify Logo"
                  className="mb-5"
                />
                {/* Logo image */}
              </Link>
              <ul className="space-y-2 font-medium">
                {/* List of navigation links */}
                <li>
                  <Link
                    href="/dashboard" // Link to the dashboard
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group" // Link styling
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900" // Icon styling
                      aria-hidden="true" // Accessibility attribute
                      xmlns="http://www.w3.org/2000/svg" // XML namespace for SVG
                      fill="currentColor" // Icon color
                      viewBox="0 0 22 21" // Icon viewbox
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      {/* Icon path data */}
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      {/* Second path data */}
                    </svg>
                    {/* Icon for the dashboard */}
                    <span className="ms-3">Dashboard</span>
                    {/* Text for the link */}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings" // Link to the settings page
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group" // Link styling
                  >
                    <Image
                      src="/settingsicon.svg"
                      width={20}
                      height={20}
                      alt="Settings Icon"
                    />
                    {/* Icon for settings */}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Settings
                    </span>
                    {/* Text for the link */}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleReportFeedback}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#007991] group"
                  >
                    <IconInfoCircle />
                    <span className="ms-3">Report Feedback</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* End of top section */}
            <div id="left-bottom" className="gap-2 flex">
              {/* Bottom section for user information and sign-out */}
              <div>
                <SignoutButton /> {/* Sign-out button component */}
              </div>
              <Link href="/settings" className="flex">
                {/* Link to the settings page */}
                <div className="text-xl font-bold">
                  {/* User's current username */}
                  {userDetails.username}
                </div>
              </Link>
              <div className="absolute right-4 bottom-4">
                {/* Positioned link for dashboard */}
                <Link href="/dashboard">
                  {/* Link to the dashboard */}
                  <div className="rounded-full p-1 bg-[#007991]">
                    {/* Circle button */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg" // XML namespace for SVG
                      className="h-6 w-6" // Icon size
                      fill="none" // No fill
                      viewBox="0 0 24 24" // Viewbox for the SVG
                      stroke="white" // Stroke color
                    >
                      <path
                        strokeLinecap="round" // Rounded line caps
                        strokeLinejoin="round" // Rounded line joins
                        strokeWidth="3" // Stroke width
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" // Plus sign path data
                      />
                      {/* Icon representing "Add" or "Plus" */}
                    </svg>
                  </div>
                  {/* End of circle button */}
                </Link>
                {/* Link end */}
              </div>
            </div>
            {/* End of bottom section */}
          </div>
        </aside>
        {/* End of sidebar */}
        <div
          id="right-area"
          className="w-full h-full flex flex-col justify-center items-center"
        >
          {/* Main content area */}
          <h1 className="mb-10 text-5xl font-bold font-poppins">Settings</h1>
          {/* Heading for the settings page */}
          {/* Section for changing password */}
          <div className="w-1/2 mb-10 flex justify-center items-center">
            <form
              onSubmit={handlePassFieldSubmit} // Handler for form submission
              className="text-2xl font-poppins gap-5 w-full h-full flex flex-col justify-center items-center"
            >
              <div className="mb-4 w-full">
                {/* Field for current password */}
                <label
                  htmlFor="currentPassword"
                  className="font-semibold mb-2 flex"
                >
                  Current Password:
                </label>
                {/* Label */}
                <input
                  type="password" // Input type for password
                  id="currentPassword" // ID for the input
                  name="currentPassword" // Name for the input
                  value={currentPassword} // Current value of the field
                  onChange={handlePassFieldChange} // Change handler
                  className="w-full bg-transparent rounded-xl border-2 border-black" // Styling
                />
              </div>

              <div className="mb-4 w-full">
                {/* Field for new password */}
                <label
                  htmlFor="newPassword"
                  className="font-semibold mb-2 flex"
                >
                  New Password:
                </label>
                {/* Label */}
                <input
                  type="password" // Input type for password
                  id="newPassword" // ID for the input
                  name="newPassword" // Name for the input
                  value={newPassword} // Current value of the field
                  onChange={handlePassFieldChange} // Change handler
                  className="w-full bg-transparent rounded-xl border-2 border-black" // Styling
                />
                <span className="text-sm text-gray-400 mt-2 mb-2 flex">
                  This field is only applicable for Non-Google Users
                </span>
                {/* Note */}
              </div>

              <div>
                <button
                  type="submit"
                  className="drop-shadow-lg bg-[#007991] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl border-2 border-black"
                >
                  {/* Styling for the button */}
                  Change Password
                </button>
                {/* Submit button for changing password */}
              </div>
            </form>
            {/* End of form */}
          </div>
          {/* Section for changing username */}
          <div className="w-1/2 flex justify-center items-center mt-8">
            {/* Margin top to separate from the previous section */}
            <form
              onSubmit={handleUsernameSubmit} // Handler for form submission
              className="text-2xl font-poppins w-full h-full flex flex-col justify-center items-center"
            >
              <div className="mb-4 p-4 w-full">
                {/* Field for new username */}
                <label
                  htmlFor="newUsername"
                  className="font-semibold mb-2 flex"
                >
                  New Username:
                </label>
                {/* Label */}
                <input
                  type="text" // Input type for text
                  id="newUsername" // ID for the input
                  name="newUsername" // Name for the input
                  value={newUsername} // Current value of the field
                  onChange={handleUsernameFormChange} // Change handler
                  required // Input is required
                  className="bg-transparent w-full rounded-xl border-2 border-black" // Styling
                />
              </div>
              <button
                type="submit"
                className="drop-shadow-lg bg-[#007991] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl border-2 border-black"
              >
                {/* Button styling */}
                Change Username
              </button>
              {/* Submit button for changing username */}
              {userMessage && (
                <p className="text-sm text-black">{userMessage}</p>
              )}
              {/* Display success message if set */}
            </form>
            {/* End of form */}
            {error && ( // If there is an error message, show the error display
              <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
                {/* Error display styling */}
                <ErrorDisplay errorMessage={error} handleError={handleError} />
                {/* Custom error component */}
              </div>
            )}
            {showFeedbackForm && (
              <FeedbackForm
                feature="General"
                handleFeedbackCancel={handleFeedbackCancel}
                handleFeedbackSubmit={handleFeedbackSubmit}
                submitState={isSubmittingFeedback}
              />
            )}
          </div>
        </div>
        {/* End of main content area */}
      </div>
      {/* End of main container */}
      {/* Section for unsupported devices */}
      <div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
        {/* Styling for full-screen flex container */}
        <div className="text-center">
          {/* Centered text container */}
          <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
          {/* Heading for unsupported devices */}
          <p className="text-lg mb-8">
            We're sorry, but our platform is not supported on mobile devices.
          </p>
          {/* Explanation */}
          <p className="text-lg">
            Please switch to a larger screen, such as a desktop or tablet, to
            access our platform.
          </p>
          {/* Suggestion */}
        </div>
      </div>
      {/* End of unsupported device section */}
    </>
  );
};

export default Settings; // Export the Settings component

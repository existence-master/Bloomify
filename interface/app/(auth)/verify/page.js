"use client"; // Indicates that this component runs on the client-side in Next.js

import { useState, useEffect } from "react"; // React hooks for state management and side effects
import { useRouter, useSearchParams } from "next/navigation"; // Navigation hooks in Next.js
import Image from "next/image"; // Next.js optimized image component
import { getCookie } from "cookies-next"; // Function to get a cookie in Next.js
import { useSession } from "next-auth/react"; // Next.js authentication hook
import ErrorDisplay from "@components/ErrorDisplay";

const Verify = () => {
  const router = useRouter(); // Instance of the Next.js router
  const [otp, setOtp] = useState(""); // State for storing the OTP
  const [hash, setHash] = useState(""); // State for storing the hash of the OTP
  const [otpSent, setOtpSent] = useState(false); // State to indicate whether OTP has been sent
  const [error, setError] = useState(""); // State for error messages
  const [cooldown, setCooldown] = useState(false); // State to indicate if cooldown is active
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track authorization status

  const searchParams = useSearchParams(); // Hook to access URL search parameters
  const { status } = useSession(); // Hook to get the current session status

  // If the user is authenticated, redirect to the dashboard
  if (status === "authenticated") {
    router.push("/dashboard");
  }

  useEffect(() => {
    // Check the "signup-flow" and "forgotpasswordflow" cookies to determine if the user is authorized
    const signupFlowCookie = getCookie("signup-flow"); // Retrieve the "signup-flow" cookie
    const forgotPasswordFlowCookie = getCookie("forgot-password-flow"); // Retrieve the "forgotpasswordflow" cookie

    if (signupFlowCookie === "true" || forgotPasswordFlowCookie === "true") {
      setIsAuthorized(true); // Mark as authorized if any of the conditions are met
    } else {
      router.push("/login"); // Redirect to the signup page if not authorized
    }
  }, [router, searchParams]); // Dependency array ensures the effect runs when the component mounts or searchParams changes

  // If the user is not authorized, don't render the component
  if (!isAuthorized) {
    return null; // Return null to prevent unauthorized users from seeing the component
  }

  const userEmail = searchParams.get("userEmail"); // Get the userEmail from the URL search parameters

  // Function to send the OTP to the user's email
  const handleSendOtp = async () => {
    try {
      setCooldown(true); // Activate cooldown to prevent multiple requests
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content type for JSON data
        },
        body: JSON.stringify({ userEmail }), // Send the userEmail to the server
      });

      // If the response is successful, store the hash and set the OTP as sent
      if (response.ok) {
        const hash = await response.text(); // Retrieve the hash from the server response
        setHash(hash); // Store the hash in state
        setOtpSent(true); // Mark that OTP has been sent
        // Set a 60-second cooldown before allowing resend
        setTimeout(() => setCooldown(false), 60 * 1000); // 60-second cooldown
      } else {
        const errorText = await response.text(); // Get error text from the server response
        throw new Error(`Error response from server: ${errorText}`); // Throw error
      }
    } catch (error) {
      setCooldown(false); // Deactivate cooldown in case of an error
    }
  };

  // Function to submit the OTP for verification
  const handleOTPSubmit = async () => {
    try {
      // Request server to verify the OTP
      let response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content type for JSON data
        },
        body: JSON.stringify({ userEmail, otp, hash }), // Send the OTP and hash for verification
      });

      // If the verification is successful
      if (response.ok) {
        setOtp(""); // Clear the OTP state
        const forgotPasswordFlowCookie = getCookie("forgot-password-flow"); // Retrieve the "forgotpasswordflow" cookie

        if (forgotPasswordFlowCookie) {
          // Redirect to the change password page if forgotPassword is true
          router.push(`/change-password?userEmail=${userEmail}`);
        } else {
          // Proceed with the signup flow
          // Get user session data from the server
          response = await fetch("/api/get-session", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            // If the session data retrieval is successful, proceed to signup
            const { userEmail, password } = await response.json(); // Get user details from the server response
            response = await fetch("/api/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Content type for JSON data
              },
              body: JSON.stringify({
                userEmail,
                password,
              }),
            });

            if (response.ok) {
              // Redirect to the details page with the userEmail as a parameter
              router.push(`/details?userEmail=${userEmail}`);
            } else {
              throw new Error("This email is already registered"); // Error message for existing emails
            }
          }
        }
      } else {
        const errorText = await response.text(); // Get error text from the server response
        throw new Error(`Error response from server: ${errorText}`); // Throw error with server response
      }
    } catch (error) {}
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <>
      {/* Main container with flex layout */}
      <div className="xs:max-md:hidden h-screen w-screen flex">
        {/* Left side with an image */}
        <div id="left" className="h-full w-1/2">
          <img
            className="h-full w-full object-cover" // Image styling
            src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" // Image source
            alt="books" // Image description for accessibility
          />
        </div>
        {/* Right side for OTP verification */}
        <div className="h-full w-1/2 bg-[#FFFAE3] flex flex-col justify-center items-center">
          {" "}
          {/* Background color for the right side */}
          <div className="h-full w-1/2 flex">
            {" "}
            {/* Container with flex layout */}
            <div className="w-full h-full flex flex-col justify-center items-center">
              {" "}
              {/* Flex layout for centering content */}
              <Image
                src="/navbarlogo.svg" // Source for the logo
                width={200} // Width of the logo
                height={50} // Height of the logo
                alt="Bloomify Logo" // Description for accessibility
                className="mb-10" // Bottom margin
              />
              <h1 className="text-3xl font-medium text-black mb-5">
                Verify your Email
              </h1>{" "}
              {/* Heading for verification */}
              <label className="block mb-2 text-xl font-medium text-gray-800">
                OTP
              </label>{" "}
              {/* Label for OTP */}
              <input
                type="text" // Input type for text
                value={otp} // Current value of the OTP state
                onChange={(e) => setOtp(e.target.value)} // Handler for input change
                placeholder="Enter OTP" // Placeholder text
                className="w-full bg-transparent border-2 border-black rounded-xl p-2 h-10" // Styling
              />
              <button
                onClick={otpSent ? handleOTPSubmit : handleSendOtp} // Submit or send OTP based on state
                className={`w-full p-2 ${
                  otpSent ? "bg-zomp" : "bg-cerulean"
                } text-white rounded-xl hover:${
                  otpSent ? "bg-[#7AB6A1]" : "bg-[#007991]"
                } focus:outline-none focus:ring focus:ring-${
                  otpSent ? "green-400" : "blue-400"
                } mt-4`} // Button styling based on OTP sent status
              >
                {otpSent ? "Submit OTP" : "Send OTP"}
              </button>
              <button
                onClick={handleSendOtp} // Handler to resend OTP
                disabled={cooldown} // Disable if in cooldown
                className={`mt-4 w-full px-4 py-2 ${
                  cooldown ? "bg-gray-500" : "bg-[#007991]"
                } text-white rounded-xl hover:${
                  cooldown ? "bg-gray-600" : "bg-[#007991]"
                } focus:outline-none focus:ring focus:ring-${
                  cooldown ? "gray-400" : "blue-400"
                }`} // Styling based on cooldown status
              >
                {cooldown ? "Resend OTP (wait)" : "Resend OTP"}{" "}
              </button>
            </div>
          </div>
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
          {/* Styling for unsupported devices */}
          <div className="text-center">
            {" "}
            {/* Container for centered content */}
            <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>{" "}
            {/* Heading for unsupported devices */}
            <p className="text-lg mb-8">
              We're sorry, but our platform is not supported on mobile devices.
            </p>{" "}
            {/* Explanation */}
            <p className="text-lg">
              Please switch to a larger screen, such as a desktop or tablet, to
              access our platform.
            </p>{" "}
            {/* Suggestion to use larger screens */}
          </div>
        </div>{" "}
        {/* End of unsupported devices section */}
      </div>
    </>
  ); // End of component JSX structure
};

export default Verify; // Export the Verify component for use in Next.js

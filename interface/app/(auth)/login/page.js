"use client"; // This component runs on the client-side in Next.js
import { signIn, useSession } from "next-auth/react"; // Next.js authentication utilities
import { useRouter } from "next/navigation"; // Navigation hook for routing
import { useEffect, useState } from "react"; // React hooks for component logic
import Image from "next/image"; // Next.js optimized image component
import Link from "next/link"; // Link component for client-side navigation
import ErrorDisplay from "@components/ErrorDisplay";

const Login = () => {
  const [error, setError] = useState(null); // State to hold error messages
  const router = useRouter(); // Router for navigation
  const session = useSession(); // Get current user session status

  useEffect(() => {
    // If the user is authenticated, redirect to the dashboard
    if (session.status === "authenticated") {
      router.push("/dashboard"); // Redirect to the dashboard
    }
  }, [session, router]); // Dependency array to re-run when session status changes

  // Function to validate email addresses using a regex pattern
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email regex pattern
    return emailRegex.test(email); // Test the provided email against the pattern
  };

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const email = e.target[0].value; // Get the email from the first form input
    const password = e.target[1].value; // Get the password from the second form input

    // Validate email
    if (!isValidEmail(email)) {
      setError("Invalid email or password"); // Set error message for invalid email
      return;
    }

    // Validate password
    if (!password || password.length < 8) {
      setError("Invalid email or password"); // Set error message for invalid password
      return;
    }

    // Sign in using credentials and handle redirect
    const res = await signIn("credentials", {
      redirect: false, // Redirect upon successful sign-in
      email,
      password,
    });

    // Check if the sign-in was successful
    if (res.url) {
      router.push("/dashboard"); // Redirect to the dashboard on success
    }

    //setError("Invalid email or password"); // Display error message for failed sign-in
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const email = e.target.form[0].value; // Get the email from the form input

    // Validate email
    if (!isValidEmail(email)) {
      setError("Email is invalid"); // Set error message for invalid email
      return;
    }

    // Make a POST request to set the changePasswordFlow cookie
    const response = await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "forgot-password-flow",
        value: "true",
        maxAge: 3600, // 1 hour
      }),
    });

    // Check if the cookie was set successfully
    if (response.ok) {
      // Redirect to the verify page with email and forgotPassword query parameters
      router.push(`/verify?userEmail=${email}&forgotPassword=true`);
    } else {
      setError("Failed to initiate password reset. Please try again.");
    }
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <>
      <div className="xs:max-md:hidden">
        {" "}
        {/* Ensure this section is only shown on larger screens */}
        <div className="h-screen w-screen flex">
          {" "}
          {/* Full-screen flex container */}
          <div id="left" className="h-full w-1/2 bg-blue-300">
            {" "}
            {/* Left half with an image */}
            <img
              className="h-full w-full object-cover" // Image takes full height and width
              src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg"
              alt="books" // Image description for accessibility
            />
          </div>
          <div
            id="right"
            className="h-screen w-1/2 bg-[#FFFAE3] flex flex-col justify items-center"
          >
            {" "}
            {/* Right half for login form */}
            <div className="h-full w-full flex">
              {" "}
              {/* Full-height and full-width flex container */}
              <div className="w-full flex flex-col justify-center items-center">
                {" "}
                {/* Centered content */}
                <Image
                  src="/navbarlogo.svg" // Logo source
                  width={200} // Logo width
                  height={50} // Logo height
                  alt="Bloomify Logo" // Logo description
                  className="mb-10" // Bottom margin
                />
                <h1 className="text-3xl font-medium text-black mb-5 font-poppins">
                  Login
                </h1>{" "}
                {/* Section heading */}
                <form onSubmit={handleSubmit} className="w-1/2">
                  {" "}
                  {/* Form for login */}
                  <h1 className="text-black mt-5 mb-2 text-xl">Email</h1>{" "}
                  {/* Label for email input */}
                  <input
                    type="text" // Input type
                    className="focus:border-blue-500 w-full border-2 border-black rounded-lg bg-transparent text-black h-10 p-2" // Styling
                    placeholder="abc@gmail.com" // Placeholder text
                    required // Required field
                  />
                  <h1 className="text-black mt-5 mb-2 text-xl">Password</h1>{" "}
                  {/* Label for password input */}
                  <input
                    type="password" // Password input type
                    className="focus:border-blue-500 w-full border-2 border-black rounded-lg bg-transparent text-black h-10 p-2" // Styling
                    placeholder="********" // Placeholder for password input
                    required // Required field
                  />
                  <div className="flex flex-col justify-center items-center">
                    {" "}
                    {/* Container for additional elements */}
                    <h1 className="text-black mt-5 mb-5">
                      New here? {/* Prompt for new users */}
                      <Link
                        className="text-[#007991] font-medium hover:underline" // Link styling with hover effect
                        href="/signup" // Link to the signup page
                      >
                        Sign up
                      </Link>{" "}
                      for free
                    </h1>
                    <button
                      className="text-white hover:shadow-lg rounded-lg w-1/5 text-xl font-semibold bg-[#007991] p-2 mb-1" // Submit button styling
                      type="submit" // Submit the form
                    >
                      Login
                    </button>{" "}
                    {/* Submit button text */}
                    <p className="text-red-600 text-[16px]">
                      {error && error}
                    </p>{" "}
                    {/* Display error message if exists */}
                    <button
                      className="text-[#007991] font-medium hover:underline" // Button styling with hover effect
                      onClick={handleForgotPassword} // Handle forgot password on click
                    >
                      Forgot Password?
                    </button>{" "}
                  </div>
                </form>{" "}
                {/* End of form */}
                <div className="text-center text-black mt-5 mb-5">Or</div>{" "}
                {/* Separator text */}
                <button
                  className="w-1/2 bg-transparent rounded-xl border-2 border-black text-black py-2 flex flex-row justify-center items-center" // Styling for Google login button
                  onClick={() => signIn("google")} // Sign in with Google on click
                >
                  <Image
                    src="/googlelogo.webp" // Google logo source
                    width={20} // Image width
                    height={20} // Image height
                    alt="Google Logo" // Description for Google logo
                    className="mr-2" // Margin-right to space out the logo
                  />
                  Login with Google
                </button>{" "}
                {/* Text for Google login button */}
              </div>
            </div>
          </div>
        </div>
        {error && ( // If there is an error message, show the error display
          <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
            {" "}
            {/* Error display styling */}
            <ErrorDisplay errorMessage={error} handleError={handleError} />{" "}
            {/* Custom error component */}
          </div>
        )}
      </div>
      <div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
        {" "}
        {/* Section for unsupported devices */}
        <div className="text-center">
          {" "}
          {/* Centered text container */}
          <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>{" "}
          {/* Heading */}
          <p className="text-lg mb-8">
            We're sorry, but our platform is not supported on mobile devices.
          </p>{" "}
          {/* Message for unsupported devices */}
          <p className="text-lg">
            Please switch to a larger screen, such as a desktop or tablet, to
            access our platform.
          </p>{" "}
          {/* Suggestion to use larger screens */}
        </div>
      </div>
    </>
  );
};

export default Login; // Export the login component

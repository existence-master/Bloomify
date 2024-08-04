"use client"; // This component is a client-side component in Next.js

import { useState, useEffect } from "react"; // Importing React hooks
import { useRouter, useSearchParams } from "next/navigation"; // Next.js navigation utilities
import Image from "next/image"; // Next.js optimized image component
import { getCookie } from "cookies-next"; // Function to get a cookie
import { useSession } from "next-auth/react"; // For handling user session

const Details = () => {
  const [error, setError] = useState(""); // State to handle error messages
  const router = useRouter(); // Router instance for navigation
  const searchParams = useSearchParams(); // To access search parameters from the URL
  const { status } = useSession(); // Get the authentication status
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track user authorization

  // If the user is authenticated, redirect to the dashboard
  if (status === "authenticated") {
    router.push("/dashboard");
  }

  useEffect(() => {
    // Check the cookie to determine if the "signup-flow" is set to `true`
    const signupFlowCookie = getCookie("signup-flow"); // Retrieve the "signup-flow" cookie
    if (signupFlowCookie === "true") {
      setIsAuthorized(true); // If the cookie is true, the user is authorized
    } else {
      router.push("/signup"); // Redirect to the signup page if not authorized
    }
  }, [router]); // Dependency array ensures this effect runs once on component mount

  // If the user is not authorized, don't render the component
  if (!isAuthorized) {
    return null; // Return null to prevent unauthorized users from seeing the component
  }

  // Handle form submission for submitting user details
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Extracting form values
    const username = e.target[0].value; // Get the username from the first form element
    const university = e.target[1].value; // Get the university from the second form element
    const userEmail = searchParams.get("userEmail"); // Get userEmail from URL search params

    try {
      // Make a POST request to submit the user details
      const res = await fetch("/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          university,
          userEmail,
        }),
      });

      if (res.status === 400) {
        setError("This username already exists"); // Display error if the username is taken
      } else if (res.status === 200) {
        setError(""); // Clear the error message
        const response = await fetch("/api/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "signup-flow",
            value: "false",
          }),
        });

        if (response.ok) {
          router.push("/login"); // Redirect to the login page upon success
        }
      }
    } catch (error) {
      setError("Error, try again"); // Display error on fetch failure
    }
  };

  return (
    <>
      <div className="xs:max-md:hidden h-screen w-screen flex">
        <div className="h-full w-1/2">
          <img
            className="h-full w-full object-cover"
            src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" // Example image
            alt="books" // Image description
          />
        </div>
        <div className="h-full w-1/2 bg-[#FFFAE3] flex flex-col justify-center items-center">
          <div className="h-full w-1/2 flex flex-col justify-center items-center">
            <Image
              src="/navbarlogo.svg" // Logo source
              width={200} // Image width
              height={50} // Image height
              alt="Bloomify Logo" // Alternative text for accessibility
              className="mb-10" // Extra margin-bottom class
            />
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-medium text-[#007991] mb-2">
                Enter your details
              </h1>{" "}
              {/* Section heading */}
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                {" "}
                {/*Form to submit details*/}
                <h1 className="text-black text-xl mt-5 mb-2">Username</h1>{" "}
                {/* Label for username input*/}
                <input
                  type="text" // Input type
                  className="form-control border-2 h-10 p-2 border-black rounded-lg bg-[#FFFAE3] text-black mb-5" // Input styling
                  placeholder="abc123" // Placeholder text
                  required // Required field
                  name="username"
                />
                <h1 className="text-black text-xl mb-2">University</h1>{" "}
                {/* Label for university select */}
                <input
                  type="text"
                  name="university" // Name attribute for the input
                  className="text-black h-10 rounded-lg p-2 bg-[#FFFAE3] border-2 border-black" // Styling
                  required // Required field
                />
                <div className="flex flex-col justify-center items-center mt-10">
                  {" "}
                  {/* Container for submit button*/}
                  <button
                    className="p-2 text-white w-1/2 shadow-lg rounded-xl border-2 border-black text-2xl font-sans bg-[#007991]" // Styling for submit button
                    type="submit" // Button is for form submission
                  >
                    Finish
                  </button>{" "}
                  {/*Text for submit button*/}
                </div>
              </form>{" "}
              {/* End of form */}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
        {" "}
        // Display message for unsupported devices
        <div className="text-center">
          {" "}
          // Centered text container
          <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1> //
          Heading for unsupported device warning
          <p className="text-lg mb-8">
            We're sorry, but our platform is not supported on mobile devices.
          </p>{" "}
          // Warning message
          <p className="text-lg">
            Please switch to a larger screen, such as a desktop or tablet, to
            access our platform.
          </p>{" "}
          // Suggestion to use larger screens
        </div>
      </div>
    </>
  ); // End of JSX structure
};

export default Details; // Export the component for use elsewhereconsol

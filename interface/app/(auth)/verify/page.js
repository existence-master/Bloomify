"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getCookie } from "cookies-next"; // Import the required functions
import { useSession } from "next-auth/react";

const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [hash, setHash] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
	const [cooldown, setCooldown] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false); // State to track authorization

	const searchParams = useSearchParams();
	const {status} = useSession()

  if (status === "authenticated") {
    router.push("/dashboard")
  }
	
  useEffect(() => {
    // Check the cookie to determine if the "signup-flow" is set to `true`
	  const signupFlowCookie = getCookie("signup-flow");
	  //console.log(signupFlowCookie)
    if (signupFlowCookie === "true") {
      setIsAuthorized(true); // Mark as authorized
    } else {
      router.push("/signup"); // Redirect if not authorized
    }
  }, [router]); // Ensure this runs once when the component mounts

	
	if (!isAuthorized) {
		// Don't render the component if not authorized
		return null; // This prevents the flash of the component
	  }

  const userEmail = searchParams.get("userEmail");

  const handleSendOtp = async () => {
	try {
	  setCooldown(true); // Activate cooldown
	  const response = await fetch("/api/send-otp", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ userEmail }),
	  });

	  if (response.ok) {
		const hash = await response.text();
		setHash(hash);
		setOtpSent(true);
		// Set a 60-second cooldown before allowing to resend
		setTimeout(() => setCooldown(false), 60 * 1000);
	  } else {
		const errorText = await response.text();
		throw new Error(`Error response from server: ${errorText}`);
	  }
	} catch (error) {
	  console.error(error);
	  setCooldown(false);
	}
  };

  const handleOTPSubmit = async () => {
	try {
	  let response = await fetch("/api/verify-otp", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ userEmail, otp, hash }),
	  });

	  if (response.ok) {
		setOtp("");
		response = await fetch("/api/get-session", {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json",
		  },
		});

		if (response.ok) {
		  const { userEmail, password } = await response.json();
		  response = await fetch("/api/signup", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  userEmail,
			  password,
			}),
		  });

		  if (response.ok) {
			router.push(`/details?userEmail=${userEmail}`);
		  } else {
			throw new Error("This email is already registered");
		  }
		}
	  } else {
		const errorText = await response.text();
		throw new Error(`Error response from server: ${errorText}`);
	  }
	} catch (error) {
	  console.error(error);
	}
  };

  return (
	<>
	<div className="xs:max-md:hidden h-screen w-screen flex">
	  	<div id="left" className="h-full w-1/2">
            <img className="h-full w-full object-cover" src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" alt="books" />
    	</div>
		<div className="h-full w-1/2 bg-[#FFFAE3] flex flex-col justify-center items-center">
			<div className="h-full w-1/2 flex">
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Image 
					src = "/navbarlogo.svg"
					width={200}
					height={50}
					alt="Bloomify Logo"
					className="mb-10"
				/>
				<h1 className="text-3xl font-medium text-black mb-5">Verify your Email</h1>
				<label className="block mb-2 text-xl font-medium text-gray-800">OTP</label>
				<input
				type="text"
				value={otp}
				onChange={(e) => setOtp(e.target.value)}
				placeholder="Enter OTP"
				className="w-full bg-transparent border-2 border-black rounded-xl p-2 h-10"
				/>
				<button
				onClick={otpSent ? handleOTPSubmit : handleSendOtp}
				className={`w-full p-2 bg-${otpSent ? "green" : "blue"}-500 text-white rounded-xl hover:bg-${otpSent ? "green" : "blue"}-600 focus:outline-none focus:ring focus:ring-${otpSent ? "green" : "blue"}-400 mt-4`}
				>
				{otpSent ? "Submit OTP" : "Send OTP"}
				</button>
				<button
				onClick={handleSendOtp}
				disabled={cooldown}
				className={`mt-4 w-full px-4 py-2 bg-${cooldown ? "gray" : "blue"}-500 text-white rounded-xl hover:bg-${cooldown ? "gray" : "blue"}-600 focus:outline-none focus:ring focus:ring-${cooldown ? "gray" : "blue"}-400`}
				>
				{cooldown ? "Resend OTP (wait)" : "Resend OTP"}
				</button>
				<div className="text-center text-black mt-5 mb-5">Or</div>
				<button className="w-1/2 bg-transparent rounded-xl border-2 border-black text-black py-2 flex flex-row justify-center items-center" onClick={() => signIn("google")}> <Image src="/googlelogo.webp" width={20} height={20} alt="Google Logo" className="mr-2"/> Sign In with Google</button>
			</div>
			</div>
		</div>
	</div>
	<div className="md:hidden bg-[#FFFAE3] flex justify-center items-center h-screen">
          <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Unsupported Device</h1>
              <p className="text-lg mb-8">We're sorry, but our platform is not supported on mobile devices.</p>
              <p className="text-lg">Please switch to a larger screen, such as a desktop or tablet, to access our platform.</p>
          </div>
      </div>
	</>
  );
};

export default Verify;
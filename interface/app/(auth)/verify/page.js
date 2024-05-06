"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [hash, setHash] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const searchParams = useSearchParams();

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
	<div className="h-screen w-screen bg-black flex">
	  <div className="h-full w-6/12 bg-blue-300">
		<img className="h-full w-full object-cover" src="https://i.pinimg.com/originals/49/e776c2141c15b50f29833266c69eaa.jpg" alt="books" />
	  </div>
	  <div className="h-screen w-6/12 bg-amber-100">
		<div className="h-full w-6/12 flex gap-4">
		  <img className="h-16 w-16 ml-60 mt-20" src="\bloomify logo.png" alt="bloomify-logo" />
		  <h1 className="text-cyan-600 ml-70 mt-24 text-4xl font-medium">Bloomify</h1>
		  <div className="h-96 w-6/12 absolute mt-48">
			<h1 className="text-3xl font-medium text-black ml-48 mt-4">Login</h1>
			<label className="block mb-2 font-medium text-gray-800">OTP</label>
			<input
			  type="text"
			  value={otp}
			  onChange={(e) => setOtp(e.target.value)}
			  placeholder="Enter OTP"
			  className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
			/>
			<button
			  onClick={otpSent ? handleOTPSubmit : handleSendOtp}
			  className={`block w-full px-4 py-2 bg-${otpSent ? "green" : "blue"}-500 text-white rounded-md hover:bg-${otpSent ? "green" : "blue"}-600 focus:outline-none focus:ring focus:ring-${otpSent ? "green" : "blue"}-400`}
			>
			  {otpSent ? "Submit OTP" : "Send OTP"}
			</button>
			<button
			  onClick={handleSendOtp}
			  disabled={cooldown}
			  className={`mt-4 block w-full px-4 py-2 bg-${cooldown ? "gray" : "blue"}-500 text-white rounded-md hover:bg-${cooldown ? "gray" : "blue"}-600 focus:outline-none focus:ring focus:ring-${cooldown ? "gray" : "blue"}-400`}
			>
			  {cooldown ? "Resend OTP (wait)" : "Resend OTP"}
			</button>
			<button className="ml-60 w-1/3 bg-white text-black py-2 rounded-lg hover:bg-gray-100" onClick={() => signIn("google")}> Sign In with Google</button>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default Verify;
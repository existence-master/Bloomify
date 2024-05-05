"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Details = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const university = e.target[1].value;
    const userEmail = searchParams.get("userEmail")

    try {
      const res = await fetch("/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          university,
          userEmail
        }),
      });

      if (res.status === 400) {
        setError("This username already exists");
      } else if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex">
      <div className="h-full w-6/12 bg-blue-300">
        <img
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg"
          alt="books"
        />
      </div>
      <div className="h-screen w-6/12 bg-amber-100">
        <div className="h-full w-6/12 flex gap-4">
          <img
            className="h-16 w-16 ml-60 mt-20"
            src="/bloomify_logo.png"
            alt="bloomify-logo"
          />
          <h1 className="text-cyan-600 ml-70 mt-24 text-4xl font-medium">Bloomify</h1>
          <div className="h-96 w-6/12 absolute mt-48">
            <h1 className="text-3xl font-medium text-black ml-48 mt-4">Login</h1>
            <form onSubmit={handleSubmit}>
              <h1 className="text-black pl-48 pt-5 mb-2">Username</h1>
              <input
                type="text"
                className="form-control ml-48 border-2 border-black rounded-lg pl-2 pt-2 pb-2 bg-amber-100 text-black w-6/12"
                placeholder="abc123"
                required
              />
              <h1 className="text-black pl-48 pt-5 mb-2">University</h1>
              <select
                name="university"
                className="text-black w-6/12 ml-48 pt-2 pb-2 pl-2 pr-2 rounded-lg bg-amber-100 border-2 border-black mb-10"
                required
              >
                <option value="Savitribai Phule Pune University">Savitribai Phule Pune University</option>
                <option value="COEP Technological University">COEP Technological University</option>
                <option value="MIT WPU University">MIT WPU University</option>
              </select>
              <button
                className="text-white hover:shadow-lg rounded-lg ml-72 pt-2 pl-2 pb-2 pr-2 w-1/5 text-xl font-semibold bg-cyan-600 mb-1"
                type="submit"
              >
                Finish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
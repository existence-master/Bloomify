"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

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
    <>
      <div className="xs:max-md:hidden h-screen w-screen flex">
        <div className="h-full w-1/2">
          <img
            className="h-full w-full object-cover"
            src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg"
            alt="books"
          />
        </div>
        <div className="h-full w-1/2 bg-amber-100 flex flex-col justify-center items-center">
          <div className="h-full w-1/2 flex flex-col justify-center items-center">
            <Image 
              src = "/navbarlogo.svg"
              width={200}
              height={50}
              alt="Bloomify Logo"
              className="mb-10"
            />
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-3xl font-medium text-[#007991] mb-2">Enter your details</h1>
              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <h1 className="text-black text-xl mt-5 mb-2">Username</h1>
                <input
                  type="text"
                  className="form-control border-2 h-10 p-2 border-black rounded-lg bg-amber-100 text-black mb-5"
                  placeholder="abc123"
                  required
                />
                <h1 className="text-black text-xl mb-2">University</h1>
                <select
                  name="university"
                  className="text-black h-10 rounded-lg p-2 bg-amber-100 border-2 border-black"
                  required
                >
                  <option value="Savitribai Phule Pune University">Savitribai Phule Pune University</option>
                  <option value="COEP Technological University">COEP Technological University</option>
                  <option value="MIT WPU University">MIT WPU University</option>
                </select>
                <div className="flex flex-col justify-center items-center mt-10">
                  <button
                    className="p-2 text-white w-1/2 shadow-lg rounded-xl border-2 border-black text-2xl font-sans bg-[#007991]"
                    type="submit"
                  >
                    Finish
                  </button>
                </div>
              </form>
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

export default Details;
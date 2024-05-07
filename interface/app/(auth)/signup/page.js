"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(userEmail)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    try {
      const response = await fetch("/api/set-session", {
        method: "POST",
        headers: {
          "ContentType": "application/json"
        },
        body: JSON.stringify({
          userEmail,
          password
        })
      }
      )
       
      if (response.ok) {
        router.push(`/verify?userEmail=${userEmail}`)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="h-full w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg"
          alt="books"
        />
      </div>
      <div className="h-screen w-1/2 bg-[#FFFAE3]">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Image
            className="mb-10"
            src="/navbarlogo.svg"
            alt="bloomify-logo"
            width={200}
            height={50}
          />
          <div className="w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-medium text-black mb-5">
              Create Account
            </h1>
            <form onSubmit={handleSubmit} className="w-full font-poppins">
              <h1 className="text-black text-xl mt-5 mb-2">Email</h1>
              <input
                type="text"
                className="w-full form-control border-black border-2 rounded-lg bg-[#FFFAE3] text-black mb-5 h-10 p-2"
                placeholder="abc@gmail.com"
                required
              />
              <h1 className="text-black text-xl mt-5 mb-2">Password</h1>
              <input
                type="password"
                className="w-full form-control border-2 border-black rounded-lg bg-[#FFFAE3] text-black mb-5 h-10 p-2"
                placeholder="********"
                required
              />
              <div className="flex flex-col justify-center items-center mb-10">
                <h1 className="text-black mb-4">
                  Already have an account?{" "}
                  <Link
                    className="text-blue-600 font-medium hover:underline"
                    href="/login"
                  >
                    Login here
                  </Link>{" "}
                  for free
                </h1>
                <button
                  className="text-white w-40 hover:shadow-lg rounded-lg text-xl p-2 font-semibold bg-[#007991]"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
              <p className="text-red-600 text-[16px] text-center mb-2">
                {error && error}
              </p>
            </form>
            <div className="text-center text-black mb-5">Or</div>
            <button
              className="text-xl w-full bg-transparent text-black py-2 rounded-xl border-2 border-black flex flex-row justify-center items-center"
              onClick={() => signIn("google")}
            >
              <Image src="/googlelogo.webp" width={20} height={20} alt="Google Logo" className="mr-2"/>
              Sign up with Google
            </button>
          </div>
        </div>

        {/* <div className=""></div> */}
      </div>
    </div>
  );
};

export default Signup;

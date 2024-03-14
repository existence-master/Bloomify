"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";

const login = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const session = useSession();
    console.log(session);
    

    useEffect(() => {
        if(session?.status === "authenticated" ){
            router.replace("/dashboard")
        }
    }, [session, router]);
    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        if(!isValidEmail(email)){
            setError("Email is invalid")
            return;
        }

        if(!password || password.length <8){
            setError("Password is invalid")
            return; 
        }

        const res = await signIn("credentials",{
            redirect: false,
            email,
            password
        })

        if(res?.error) {
            setError("Invalid email or password");
            if (res?.url) router.replace("/dashboard");
        } else {
            setError("");
        }


    };
    return  <div className= "h-screen w-secreen bg-black flex">
        <div className="h-full w-6/12 bg-blue-300">
            <img className="h-full w-full object-cover"src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" alt="books" />
        </div>
        <div className="h-screen w-6/12 bg-amber-100">
            <div className="h-full w-6/12 flex gap-4">
                <img className="h-16 w-16 ml-60 mt-20 "src="\bloomify logo.png" alt="bloomify-logo" />
                <h1 className="text-cyan-600 ml-70 mt-24 text-4xl font-medium">Bloomify</h1>
                <div className="h-96 w-6/12 absolute mt-48 ">
                    <h1 className="text-3xl font-medium text-black ml-48 mt-4 " >Login</h1>
                    <form onSubmit={handleSubmit}>
                            <h1 className="text-black pl-48 pt-5 mb-2">Email</h1>
                            <input type="text" className="form-control ml-48 border-2 border-black rounded-lg pl-2 pt-2 pb-2 bg-amber-100 text-black w-6/12" placeholder="abc@gmail.com" required/>
                            <h1 className="text-black pl-48 pt-5 mb-2">Password</h1>
                            <input type="password" className="form-control ml-48 border-2 border-black rounded-lg pl-2 pt-2 pb-1 bg-amber-100 text-black w-6/12" placeholder="********" required/>
                            <h1 className="text-black pl-52 pt-2 mb-5 ">New User? <a className = "text-blue-600 font-medium hover:underline "href="/signup">Sign up</a> for free</h1>
                            <button className="text-white  hover:shadow-lg rounded-lg ml-72 pt-2 pl-2 pb-2 pr-2 w-1/5 text-xl font-semibold bg-cyan-600 mb-1" type="submit">Sign In</button>
                            <div className="text-center text-black mt-2 pr-10">Or</div>
                            <p className="text-red-600 text-[16px] mb-4 ml-[300px]">{error && error}</p>
                    </form>
                    <button className="ml-60 w-1/3 bg-white text-black py-2 rounded-lg hover:bg-gray-100" onClick={() => signIn("google")}> Sign In with Google</button>
                    
                </div>
            </div>
            

           

        </div>
    </div>
};

export default login;
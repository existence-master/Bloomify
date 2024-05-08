"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const login = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const session = useSession();    

    useEffect(() => {
        if(session.status === "authenticated" ){
            router.push("/dashboard")
        }
    }, [session, router]);
    
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    const handleSubmit = async (e) => {
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
            redirect: true,
            email,
            password
        })

        if (res.ok) {
            router.push("/dashboard");
        }
        
        setError("Invalid email or password")

    };
    return  (
    <>
    <div className="xs:max-md:hidden">
        <div className= "h-screen w-screen flex">
            <div id="left" className="h-full w-1/2 bg-blue-300">
                <img className="h-full w-full object-cover" src="https://i.pinimg.com/originals/49/e7/76/49e776c2141c15b50f29833266c69eaa.jpg" alt="books" />
            </div>
            <div id="right" className="h-screen w-1/2 bg-[#FFFAE3] flex flex-col justify items-center">
                <div className="h-full w-full flex">
                    <div className="w-full flex flex-col justify-center items-center">
                        <Image 
                            src = "/navbarlogo.svg"
                            width={200}
                            height={50}
                            alt="Bloomify Logo"
                            className="mb-10"
                        />
                        <h1 className="text-3xl font-medium text-black mb-5 font-poppins">Login</h1>
                        <form onSubmit={handleSubmit} className="w-1/2">
                            <h1 className="text-black mt-5 mb-2 text-xl">Email</h1>
                            <input type="text" className="focus:border-blue-500 w-full border-2 border-black rounded-lg bg-transparent text-black h-10 p-2" placeholder="abc@gmail.com" required/>
                            <h1 className="text-black mt-5 mb-2 text-xl">Password</h1>
                            <input type="password" className="focus:border-blue-500 w-full border-2 border-black rounded-lg bg-transparent text-black h-10 p-2" placeholder="********" required/>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-black mt-5 mb-5">New here? <Link className = "text-[#007991] font-medium hover:underline "href="/signup">Sign up</Link> for free</h1>
                                <button className="text-white  hover:shadow-lg rounded-lg w-1/5 text-xl font-semibold bg-[#007991] p-2 mb-1" type="submit">Login</button>
                                <p className="text-red-600 text-[16px]">{error && error}</p>
                                <div className="text-center text-black mt-5 mb-5">Or</div>
                            </div>
                        </form>
                        <button className="w-1/2 bg-transparent rounded-xl border-2 border-black text-black py-2 flex flex-row justify-center items-center" onClick={() => signIn("google")}><Image src="/googlelogo.webp" width={20} height={20} alt="Google Logo" className="mr-2"/>Login with Google</button>
                    </div>
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

export default login;
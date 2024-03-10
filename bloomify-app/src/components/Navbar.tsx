"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  return (
    <div>
      <ul className="absolute justify-between m-4 ml-7 item-center ">
        <div className="flex justify-between m-4 ml-7 item-center">
        <div>
          <Link href="/">
            <li className="mr-7">Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          {/* <Link href="/dashboard">
            <li>Dashboard</li>
          </Link> */}
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/signup">
                <li>Sign Up</li>
              </Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    signOut();
                    
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
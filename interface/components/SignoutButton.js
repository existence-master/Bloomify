// SignoutButton.js

import { signOut } from "next-auth/react";
import Image from "next/image";

const SignoutButton = () => {
  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: 'http://localhost:3000/' }); // Set redirect to false to prevent automatic redirect after signout
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
  <div onClick={handleSignout}>
    <Image src="/signout.svg" className="cursor-pointer" width={32} height={32}/>
  </div>
  );
};

export default SignoutButton;

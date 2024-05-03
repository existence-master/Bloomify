// SignoutButton.js

import { signOut } from "next-auth/react";

const SignoutButton = () => {
  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: 'http://localhost:3000/' }); // Set redirect to false to prevent automatic redirect after signout
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return <button className="text-white bg-[#007991] hover:bg-[#222E50] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-[#007991] dark:hover:bg-[#222E50] focus:outline-none dark:focus:ring-blue-800" onClick={handleSignout}>Sign out</button>;
};

export default SignoutButton;

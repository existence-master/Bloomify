// The AuthProvider component provides the session context to all its children components
// using the SessionProvider from NextAuth. This is necessary to manage user authentication
// state throughout the application.

"use client"; // This component uses client-side rendering

import { SessionProvider } from "next-auth/react"; // Importing the SessionProvider from NextAuth

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider> {/* Provides the session context to child components */}
      {children} {/* The child components that will use the session context */}
    </SessionProvider> 
  );
};

export default AuthProvider; // Exporting the AuthProvider component

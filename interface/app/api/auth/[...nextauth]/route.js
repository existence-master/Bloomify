// Import necessary modules and utilities
import User from "@models/user"
import { connectToDB } from "@utils/database"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Define the NextAuth handler with authentication providers
const handler = NextAuth({
    providers: [
        // Google authentication provider configuration
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Email and password authentication provider configuration
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    // Connect to the database
                    await connectToDB()
                    
                    // Find the user with the provided email
                    const user = await User.findOne({ email: credentials.email })

                    // Return null if user not found
                    if (!user) {
                        return null;
                    }

                    // Compare passwords to verify if they match
                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

                    // Return null if passwords don't match
                    if (!passwordsMatch) {
                        return null;
                    }

                    // Return user details if authentication is successful
                    return { id: user._id.toString(), email: user.email }
                } catch (error) {
                    console.log(error);
                    return null // Return null in case of an error
                }
            }
        })
    ],
   
    callbacks: {
      // Callback triggered when a user signs in
        async signIn({ user, account, info }) {
          // Check if the sign-in is via Google
          if (account.provider === "google") {
            // Destructure user information
            const { name, email } = user
      
            try {
              // Connect to the database
              await connectToDB();
      
              // Check if the user already exists in the database
              const userExists = await User.findOne({ email })
      
              // If the user doesn't exist, proceed with creating a new user
              if (!userExists) {
                // Send a POST request to the signup endpoint to create a new user
                const res = await fetch("http://localhost:3000/api/signup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // Provide user information for signup
                  body: JSON.stringify({
                    name,
                    email,
                    username: info.username,
                    university: info.university,
                  }),
                })
      
                // If the signup request is successful, return the user
                if (res.ok) {
                  return user;
                }
              }
            } catch (error) {
              // Log any errors that occur during the process
              console.log(error)
            }
          }
      
          // Return the user
          return user;
        },
    
    
        // Define session callback to customize session creation
        async session({ session }) {
            // Find the user in the database based on the session user's email
            const sessionUser = await User.findOne({
                email: session.user.email 
            })
            
            // Set the user's ID in the session for identification
            session.user.id = sessionUser._id.toString()
            
            // Return the modified session object
            return session;
        }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  }
})

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST }
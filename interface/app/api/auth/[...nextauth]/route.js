// Import necessary modules and utilities
import { connectToDB } from "@utils/database"
import User from "@models/userModel"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Define authentication options for NextAuth
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          // Connect to the database
          await connectToDB()
          
          // Find the user with the provided email
          const user = await User.findOne({ email })

          // If user does not exist, return null
          if (!user) {
            return null
          }

          // Compare passwords to verify if they match
          const passwordsMatch = await bcrypt.compare(password, user.password)

          // If passwords do not match, return null
          if (!passwordsMatch) {
            return null
          }

          // Return the authenticated user
          return user;
        } catch (error) {
          console.log("Error: ", error)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

// Create the NextAuth handler with the defined options
const handler = NextAuth(authOptions)

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST }

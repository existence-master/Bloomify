import NextAuth from "next-auth"; // Import the NextAuth library for authentication
import GoogleProvider from "next-auth/providers/google"; // Google authentication provider
import CredentialsProvider from "next-auth/providers/credentials"; // Credentials authentication provider
import bcrypt from "bcryptjs"; // Library for hashing and comparing passwords
import User from "@models/User"; // User model
import connect from "@utils/db"; // Utility to connect to the database

export const authOptions = {
  // Configuration for authentication providers
  providers: [
    // Credentials provider for email-password authentication
    CredentialsProvider({
      id: "credentials", // Unique identifier for the credentials provider
      name: "Credentials", // Display name for the provider
      credentials: {
        email: { label: "Email", type: "text" }, // Credential for email
        password: { label: "Password", type: "password" }, // Credential for password
      },
      async authorize(credentials) {
        // Connect to the database
        await connect();
        try {
          // Find the user with the provided email
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            // Compare the provided password with the hashed password in the database
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user; // If the password matches, return the user
            }
          }
        } catch (err) {
          throw new Error(err); // Throw an error if something goes wrong
        }
      },
    }),

    // Google provider for authentication via Google accounts
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variables
    }),

    // Additional providers can be added here
  ],

  // Callbacks for additional behavior
  callbacks: {
    async signIn({ user, account }) {
      // Check if the sign-in provider is Google
      if (account.provider === 'google') {
        await connect(); // Connect to the database
        try {
          // Check if the user already exists in the database
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // If the user doesn't exist, create a new user
            const newUser = new User({
              email: user.email, // Set the email for the new user
              username: user.name,
              googleUser: true, // Indicate that the user signed up with Google
            });

            await newUser.save(); // Save the new user to the database  

            // If the user is new, redirect to the /details page
            return `/details?userEmail=${user.email}`;
          }

          return true; // If the user exists, no need to set the cookie
        } catch (err) {
          return false; // Return false to indicate a failure
        }
      }
      return true
    },
  },
};

// Define the handler for NextAuth using the specified options
export const handler = NextAuth(authOptions);

// Export the handler for GET and POST methods
export { handler as GET, handler as POST };

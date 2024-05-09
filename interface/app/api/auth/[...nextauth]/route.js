import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@models/User";
import connect from "@utils/db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              googleUser: true, // Signed up with Google
            });

            await newUser.save();

            // Call the endpoint to set the 'signup-flow' cookie
            const response = await fetch('/api/set-cookie', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: "signup-flow",
                value: "true"
              })
            });

            if (!response.ok) {
              console.error("Failed to set the signup-flow cookie");
              return false; // Return false if setting the cookie fails
            }

            // Redirect new users to the /details page
            return `/details?userEmail=${user.email}`;
          }

          return true; // User exists, no need to set the cookie
        } catch (err) {
          console.error("Error in signIn callback:", err);
          return false; // Return false if an error occurs
        }
      }

      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/details")) {
        return url; // Redirect to the /details page
      }

      if (url === `${baseUrl}/`) {
        return baseUrl
      }

      return "/dashboard"; // Redirect to dashboard if user exists
    },
    
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

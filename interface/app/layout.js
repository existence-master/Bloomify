import "./globals.css";
import AuthProvider from "@components/AuthProvider";
import { getServerSession } from "next-auth"; // Importing the session fetching function

export const metadata = {
  title: "Bloomify",
  description: "AI Based Assessment Creator For Teachers",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(); // Define session before using it

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}

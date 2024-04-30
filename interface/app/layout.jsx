import "./globals.css";
import SessionProvider from "@utils/SessionProvider";
import { getServerSession } from "next-auth"; // Importing the session fetching function

export const metadata = {
  title: "Bloomify",
  description: "AI Based Assessment Creator for teachers. - question paper setting AI tool",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(); // Define session before using it

  return (
    <html lang="en">
      <body className="bg-[#fffbe6]">
        <SessionProvider session={session}>
        {/* <div className="mx-auto text-xl  mb-10"> */}
             {/* <Navbar />   */}
            {children}
        {/* </div>  */}
        </SessionProvider>
      </body>
    </html>
  );
}

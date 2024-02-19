import "@styles/globals.css"
import { NextAuthProvider } from "./Providers"

export const metadata = {
  title: "Bloomify",
  description: "An AI agent based on Bloom's taxonomy which automates question paper setting",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="overflow-x-hidden">{children}</div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
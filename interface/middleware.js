export { default } from "next-auth/middleware"

// Protect home page from users who haven't signed in
export const config = { 
    matcher: ["/home"] 
}
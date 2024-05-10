// Exporting the default authentication middleware with specific configuration
export { default } from "next-auth/middleware"



// Configure the middleware to apply to specific routes
export const config = {
  matcher: ['/dashboard', '/chat/:path*', '/settings'], // Apply the middleware to these routes
};
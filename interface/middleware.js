import { withAuth } from 'next-auth/middleware'; // Importing middleware for NextAuth authentication
import { NextResponse } from 'next/server'; // Importing Next.js server response utilities

// Exporting the authentication middleware with specific configuration
export default withAuth({
  pages: {
	signIn: '/unauthenticated', // Redirect to this page if the user is not authenticated
	error: '/error', // Redirect to this page in case of an authentication error
  },
});

// Configure the middleware to apply to specific routes
export const config = {
  matcher: ['/dashboard', '/chat/:path*', '/settings'], // Apply the middleware to these routes
};
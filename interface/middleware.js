import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth({
  pages: {
    signIn: '/unauthenticated',
    error: '/error',
  }
})

export const config = {
  matcher: ['/dashboard', '/chat/:path*', '/settings'],
}
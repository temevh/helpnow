import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Protect all routes except signin, api/auth, and public assets
    "/((?!signin|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

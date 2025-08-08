import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const publicPaths = [
  '/',              // Landing page (has conditional rendering)
  '/sign-in',       // Sign-in page
  '/sign-in/(.*)',  // Any sub-routes of sign-in
  '/api/(.*)'       // Allow API routes without auth
];

const isPublicPath = createRouteMatcher(publicPaths);

export default clerkMiddleware((auth, req) => {
  // Don't enforce auth for public routes
  if (isPublicPath(req)) {
    return;
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, css, js, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/'
  ],
};
/**
 * Clerk middleware.
 *
 * Establishes the session on every request so `auth()` can resolve the user in
 * server code. Route protection itself is done in the route handlers and the
 * repository layer, not here — a middleware matcher is easy to get subtly wrong,
 * and the ownership check has to happen at the data layer regardless.
 */

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Everything except Next internals and static files, plus all API routes.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

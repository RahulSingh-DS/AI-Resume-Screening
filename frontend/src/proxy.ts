import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const recruiterRoutes = createRouteMatcher([
  "/dashboard(.*)",
]);

const candidateRoutes = createRouteMatcher([
  "/check-ats(.*)",
]);

const protectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/check-ats(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!protectedRoutes(req)) {
    return;
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
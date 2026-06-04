// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
//import { NextResponse } from "next/server";
// const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
//const isAdminRoute = createRouteMatcher(["/upload"]);

// export default clerkMiddleware(async (auth, req) => {
 //  const {sessionClaims}= await auth();
 // const isAdmin= sessionClaims?.metadata?.role === "admin";

//    if (isAdminRoute(req) && !isAdmin) {
//    const url=  new URL("/forbidden", req.url);
//     return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//   }
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

// export const config =  {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
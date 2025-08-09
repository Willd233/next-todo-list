// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.has("authjs.session-token");
  const { pathname } = req.nextUrl;

  const isPublicRoute = pathname === "/" || pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/setting");

  if (pathname === "/") {
    const destination = isLoggedIn ? "/dashboard" : "/auth/signin";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/setting/:path*", "/auth/:path*", "/"],
};

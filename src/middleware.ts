import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.has("authjs.session-token");

  const { pathname } = req.nextUrl;

  const isPrivate = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/auth");

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isPrivate && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"],
};

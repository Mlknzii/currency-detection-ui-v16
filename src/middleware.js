import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/predict") ||
    pathname.startsWith("/history");

  // Not logged in → protected page
  if (!token && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in → login/register page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/predict", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/predict/:path*", "/history/:path*", "/login", "/register"],
};

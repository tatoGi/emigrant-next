import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/client", "/provider", "/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  // Auth check — cookie set by Laravel Sanctum (or mock localStorage cookie)
  const authCookie = request.cookies.get("auth_user");
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/provider/:path*", "/admin/:path*"],
};

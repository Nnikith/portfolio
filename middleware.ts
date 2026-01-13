import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const APP_PREFIXES = ["/app", "/admin"];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Protect /app and /admin.
  if (APP_PREFIXES.some((p) => pathname.startsWith(p))) {
    const session = await auth();
    if (!session?.user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname + search);
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/admin")) {
      // isAdmin is on the database user; NextAuth session.user may not include it by default.
      // v1: keep admin pages server-protected at page-level as well.
      // Middleware only ensures authentication.
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};

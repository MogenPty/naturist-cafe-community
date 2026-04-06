import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: Request) {
  const session = await auth.getSession();

  // If no session and trying to access /admin, redirect to login
  if (!session?.data?.user && request.url.includes("/admin")) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(url);
  }

  // If session exists and trying to access /auth/login, redirect to /admin
  if (session?.data?.user && request.url.includes("/auth/login")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
};

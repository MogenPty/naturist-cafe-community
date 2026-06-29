import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    // your admin auth logic
    return NextResponse.next();
  }

  const res = NextResponse.next();
  // Forward geo headers from Vercel to the layout/server components
  const country = req.headers.get("x-vercel-ip-country");
  if (country) res.headers.set("x-user-country", country);

  const region = req.headers.get("x-vercel-ip-country-region");
  if (region) res.headers.set("x-user-region", region);
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|sitemap.xml|robots.txt|images|icons|fonts).*)",
  ],
};

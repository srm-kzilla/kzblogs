import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!req.cookies.get("next-auth.session-token")) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${path}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = { matcher: ["/bookmarks", "/write"] };

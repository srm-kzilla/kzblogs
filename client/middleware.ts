import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./utils/api";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!req.cookies.get("next-auth.session-token")) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${path}`, req.url),
    );
  }
  
  if (path === "/write") {
    const user = await getCurrentUser();

    if (!user.isAdmin) {
      return NextResponse.redirect(new URL(`/unauthorized`, req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/bookmarks", "/write"] };

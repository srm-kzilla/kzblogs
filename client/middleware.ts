import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./utils/api";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionToken=req.cookies.get("next-auth.session-token");
  if (!sessionToken) {
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${path}`, req.url),
    );
  }
  
  if (path === "/write") {
    const user = await getCurrentUser(sessionToken?.value);
    if (!user.is_admin) {
      return NextResponse.redirect(new URL(`/unauthorized`, req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/bookmarks", "/write"] };

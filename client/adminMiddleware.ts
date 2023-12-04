// pages/api/isAdmin.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { getCurrentUser } from './utils/api';

export default async function isAdminMiddleware(req: NextRequest) {
  const session = await getSession({ req: req as any }); // Cast req to any here

  // Check if the user is logged in
  if (!session) {
    return NextResponse.redirect('/api/auth/signin');
  }

  // Check if the user has the role of 'admin'
  const user = await getCurrentUser()
  if (!user.isAdmin) {
    return NextResponse.redirect('/'); // Customize this URL for unauthorized access
  }

  return NextResponse.next();
}

export const config = { matcher: ["/write"] };
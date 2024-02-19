import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    request.nextUrl.searchParams.set('from', request.nextUrl.pathname);
    request.nextUrl.pathname = '/error';
    return NextResponse.redirect(request.nextUrl);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/users', '/api/users'] };

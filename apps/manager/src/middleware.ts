import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from '~/constants/variables';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/leagues') ||
    pathname.startsWith('/players') ||
    pathname.startsWith('/teams') ||
    pathname === '/'
  ) {
    const isAuthenticated = checkAuthentication(request);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

function checkAuthentication(request: NextRequest): boolean {
  const token = request.cookies.get(env.access_token)?.value;
  return !!token;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)'],
};

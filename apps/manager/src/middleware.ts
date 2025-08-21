import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from '~/constants/variables';

export const middleware = (request: NextRequest): NextResponse => {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get(env.access_token);

  const headers = new Headers(request.headers);
  headers.set('x-pathname', pathname);

  if (pathname.startsWith('/auth')) {
    if (tokenCookie) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!tokenCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers } });
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.ico|apple-icon.ico|static|data:image|api).*)',
  ],
};

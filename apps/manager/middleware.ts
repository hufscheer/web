import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const COOKIE_NAME = 'HCC_SES';
const LOGIN_PATH = '/auth/login';

export default function middleware(req: NextRequest) {
  const accessToken = getTokenFromCookies(req);
  const pathUrl = req.nextUrl.pathname;

  if (!accessToken && !pathUrl.startsWith(LOGIN_PATH)) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  if (accessToken && pathUrl.startsWith(LOGIN_PATH)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  return request.cookies.get(COOKIE_NAME)?.value;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

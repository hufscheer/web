import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'HCC_SES';

export default function middleware(req: NextRequest) {
  const accessToken = getTokenFromCookies(req);
  const pathUrl = req.nextUrl.pathname;

  if (!accessToken && pathUrl === '/login') return NextResponse.next();

  if (!accessToken && pathUrl !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  const cookiesHeader = request.headers.get('cookie');

  if (!cookiesHeader) return null;

  const cookiesArray: [string, string][] = cookiesHeader
    .split('; ')
    .map(cookie => {
      const [key, value] = cookie.split('=');

      return [key, value];
    });

  const cookies = new Map(cookiesArray);

  return cookies.get(COOKIE_NAME);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

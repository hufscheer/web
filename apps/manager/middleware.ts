import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = '/login';

export default function middleware(req: NextRequest) {
  const accessToken = getTokenFromCookies(req);
  const pathUrl = req.nextUrl.pathname;

  if (accessToken && pathUrl.startsWith(PUBLIC_ROUTES)) {
    const url = req.nextUrl.clone();
    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  if (!accessToken && !pathUrl.startsWith(PUBLIC_ROUTES)) {
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

  return cookies.get('access');
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

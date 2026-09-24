import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const COOKIE_NAME = 'HCC_SES';
const LOGIN_PATH = '/auth/login';

/** 서명은 서버가 본다. 여기서는 만료가 확실한 토큰만 걸러 왕복 한 번을 아낀다 */
function isExpired(token: string): boolean {
  const payload = token.split('.')[1];
  if (!payload) return false;

  try {
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const { exp } = JSON.parse(json) as { exp?: number };
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

export default function proxy(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIE_NAME)?.value;

  if (req.nextUrl.pathname.startsWith(LOGIN_PATH)) return NextResponse.next();

  if (!accessToken || isExpired(accessToken)) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    const response = NextResponse.redirect(url);
    if (accessToken) response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)'],
};

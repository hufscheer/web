import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

const COOKIE_NAME = 'HCC_SES';
const LOGIN_PATH = '/auth/login';

const DESKTOP_PREFIX = '/desktop';
const DESKTOP_LOGIN_PATH = `${DESKTOP_PREFIX}/auth/login`;

/**
 * 앱 코드가 src 아래라 이 파일이 실행된다. 앱 루트의 middleware.ts 는 next dev 에서는 무시되고
 * 빌드에서만 잡혀서 로컬과 배포가 달랐다. 모바일 로직은 그 middleware.ts 를 그대로 옮긴 것이다.
 */
export default function proxy(req: NextRequest) {
  const pathUrl = req.nextUrl.pathname;

  if (pathUrl === DESKTOP_PREFIX || pathUrl.startsWith(`${DESKTOP_PREFIX}/`)) {
    return desktopProxy(req);
  }

  const accessToken = getTokenFromCookies(req);

  if (!accessToken && !pathUrl.startsWith(LOGIN_PATH)) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function desktopProxy(req: NextRequest) {
  const accessToken = getTokenFromCookies(req);

  if (req.nextUrl.pathname.startsWith(DESKTOP_LOGIN_PATH)) return NextResponse.next();

  if (!accessToken || isExpired(accessToken)) {
    const url = req.nextUrl.clone();
    url.pathname = DESKTOP_LOGIN_PATH;
    const response = NextResponse.redirect(url);
    if (accessToken) response.cookies.delete(COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

function getTokenFromCookies(request: NextRequest) {
  return request.cookies.get(COOKIE_NAME)?.value;
}

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

export const config = {
  matcher: [
    // desktop/api 는 만료 토큰으로도 로그아웃(쿠키 삭제)을 할 수 있어야 한다
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|images|desktop/api).*)',
  ],
};

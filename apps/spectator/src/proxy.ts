import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { ORG_COOKIE_MAX_AGE, ORG_COOKIE_NAME } from '~/utils/org-session';

const isPositiveInteger = (value: number) => Number.isInteger(value) && value > 0;

export default function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const raw = searchParams.get('org');
  const parsed = raw === null ? Number.NaN : Number(raw);

  if (isPositiveInteger(parsed)) {
    // URL → 쿠키 단방향 동기화. 클라이언트 effect 없이 middleware가 단일 진입점.
    const response = NextResponse.next();
    response.cookies.set(ORG_COOKIE_NAME, String(parsed), {
      path: '/',
      maxAge: ORG_COOKIE_MAX_AGE,
      sameSite: 'lax',
    });

    return response;
  }

  // URL에 org가 없으면 쿠키에서 복원 시도
  const cookieValue = request.cookies.get(ORG_COOKIE_NAME)?.value;
  const fromCookie = cookieValue ? Number(cookieValue) : Number.NaN;

  if (isPositiveInteger(fromCookie)) {
    const restored = request.nextUrl.clone();
    restored.searchParams.set('org', String(fromCookie));

    return NextResponse.redirect(restored, 307);
  }

  // 쿠키도 없으면 랜딩으로
  const welcome = request.nextUrl.clone();
  welcome.pathname = '/welcome';
  welcome.search = '';

  return NextResponse.redirect(welcome, 307);
}

export const config = {
  /*
   * 매칭에서 제외할 경로:
   * - _next (Next.js 내부)
   * - api (API 라우트)
   * - welcome (랜딩 페이지 자체)
   * - 파일 확장자가 있는 정적 자산
   */
  matcher: ['/((?!_next|api|welcome|.*\\..*).*)'],
};

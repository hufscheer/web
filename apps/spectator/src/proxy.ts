import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { ORG_COOKIE_MAX_AGE, ORG_COOKIE_NAME } from '~/utils/org-session';
import { DEFAULT_SPORT, sportToPathSegment } from '~/utils/sport-route';

const isPositiveInteger = (value: number) => Number.isInteger(value) && value > 0;

const DEFAULT_SPORT_PATH = `/${sportToPathSegment(DEFAULT_SPORT)}`;

const ORG_SEGMENT_REGEX = /^\/org\/([^/]+)(\/.*)?$/;

const buildOrgHref = (orgId: number, rest: string) => {
  const trimmed = rest === '' || rest === '/' ? DEFAULT_SPORT_PATH : rest;
  return `/org/${orgId}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
};

const setOrgCookie = (response: NextResponse, orgId: number) => {
  response.cookies.set(ORG_COOKIE_NAME, String(orgId), {
    path: '/',
    maxAge: ORG_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });
  return response;
};

const redirectToWelcome = (request: NextRequest) => {
  const welcome = request.nextUrl.clone();
  welcome.pathname = '/welcome';
  welcome.search = '';
  return NextResponse.redirect(welcome, 307);
};

const restoreFromCookieOrWelcome = (request: NextRequest, restPath: string) => {
  const cookieValue = request.cookies.get(ORG_COOKIE_NAME)?.value;
  const fromCookie = cookieValue ? Number(cookieValue) : Number.NaN;

  if (!isPositiveInteger(fromCookie)) return redirectToWelcome(request);

  const url = request.nextUrl.clone();
  url.pathname = buildOrgHref(fromCookie, restPath);
  url.search = '';
  return NextResponse.redirect(url, 307);
};

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. `/org/<id>/...` 세그먼트가 이미 있는 경우
  const orgSegment = pathname.match(ORG_SEGMENT_REGEX);
  if (orgSegment) {
    const parsed = Number(orgSegment[1]);
    if (isPositiveInteger(parsed)) {
      // URL 정답 → 쿠키에 미러링, 통과
      return setOrgCookie(NextResponse.next(), parsed);
    }
    // 세그먼트가 유효하지 않음 → 쿠키/환영 페이지로 복원
    return restoreFromCookieOrWelcome(request, orgSegment[2] ?? '');
  }

  // 2. 레거시 `?org=<id>` → 세그먼트 URL 로 영구 이동
  const legacyRaw = searchParams.get('org');
  const legacyParsed = legacyRaw ? Number(legacyRaw) : Number.NaN;
  if (isPositiveInteger(legacyParsed)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('org');
    url.pathname = buildOrgHref(legacyParsed, pathname);
    return setOrgCookie(NextResponse.redirect(url, 308), legacyParsed);
  }

  // 3. org 세그먼트도 없고 쿼리도 없음 → 쿠키 복원 또는 환영
  return restoreFromCookieOrWelcome(request, pathname);
}

export const config = {
  matcher: ['/((?!_next|api|welcome|.*\\..*).*)'],
};

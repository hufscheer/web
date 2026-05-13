import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_PREFIXES = ['/soccer', '/basketball'];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (!isProtected) return NextResponse.next();

  const raw = searchParams.get('organizationId');
  const parsed = raw === null ? Number.NaN : Number(raw);
  const isValid = Number.isInteger(parsed) && parsed > 0;
  if (isValid) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/welcome';
  url.search = '';
  return NextResponse.redirect(url, 308);
}

export const config = {
  // _next, api, welcome, 정적 자산은 제외
  matcher: ['/((?!_next|api|welcome|favicon.ico|.*\\.).*)'],
};

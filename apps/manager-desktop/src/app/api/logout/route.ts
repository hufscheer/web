import { NextResponse } from 'next/server';

const COOKIE_NAME = 'HCC_SES';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, '', {
    path: '/',
    maxAge: 0,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

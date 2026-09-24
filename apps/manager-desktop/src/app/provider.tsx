'use client';

import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@hcc/api-base';
import { setUnauthorizedHandler } from '@hcc/manager-api';

setUnauthorizedHandler(async () => {
  // 로그인 화면의 401 은 "권한 없는 계정"이다. 만료 안내를 띄우면 안 된다
  if (window.location.pathname.startsWith('/auth')) return;

  alert('로그인이 만료되었어요. 다시 로그인해주세요.');
  await fetch('/api/logout', { method: 'POST' });
  window.location.replace('/auth/login');
});

export const Provider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider>{children}</QueryClientProvider>;
};

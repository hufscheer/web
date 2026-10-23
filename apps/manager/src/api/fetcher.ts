import { getFetcher } from '@hcc/api-base';

let isRedirecting = false;

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';

const DESKTOP_PREFIX = '/desktop';

export const fetcher = getFetcher(apiBaseUrl, {
  hooks: {
    afterResponse: [
      async (request, _, response) => {
        if (response.status !== 401) return;
        if (request.url.includes('logout')) return;
        if (isRedirecting || typeof window === 'undefined') return;

        const isDesktop = window.location.pathname.startsWith(DESKTOP_PREFIX);
        const prefix = isDesktop ? DESKTOP_PREFIX : '';

        // 데스크탑 로그인 화면의 401 은 "권한 없는 계정"이다. 만료 안내를 띄우면 안 된다
        if (isDesktop && window.location.pathname.startsWith(`${prefix}/auth`)) return;

        isRedirecting = true;
        alert('로그인이 만료되었어요. 다시 로그인해주세요.');
        await fetch(`${prefix}/api/logout`, { method: 'POST' });
        window.location.replace(`${prefix}/auth/login`);
      },
    ],
  },
});

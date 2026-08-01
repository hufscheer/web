import { getFetcher, type HttpErrorHandlers } from '@hcc/api-base';

let isRedirecting = false;

const errorHandlers: HttpErrorHandlers = {
  401: async (request) => {
    if (request.url.includes('logout')) return;
    if (isRedirecting || typeof window === 'undefined') return;

    isRedirecting = true;
    alert('로그인이 만료되었어요. 다시 로그인해주세요.');
    await fetch('/api/logout', { method: 'POST' });
    window.location.replace('/auth/login');
  },
};

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';

export const fetcher = getFetcher(apiBaseUrl, { errorHandlers });

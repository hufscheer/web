import { getFetcher } from '@hcc/api-base';

type UnauthorizedHandler = () => void | Promise<void>;

let unauthorizedHandler: UnauthorizedHandler | null = null;
let isRedirecting = false;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler) => {
  unauthorizedHandler = handler;
};

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';

export const fetcher = getFetcher(apiBaseUrl, {
  hooks: {
    afterResponse: [
      async (request, _, response) => {
        if (response.status !== 401) return;
        if (request.url.includes('logout')) return;
        if (isRedirecting || typeof window === 'undefined' || !unauthorizedHandler) return;

        isRedirecting = true;
        await unauthorizedHandler();
      },
    ],
  },
});

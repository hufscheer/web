import type { Options, ResponsePromise } from 'ky';
import ky from 'ky';

const API_URL = typeof window === 'undefined' ? 'https://api.hufscheer.com' : '/api';

const defaultOption: Options = {
  retry: 0,
  timeout: 30000,
  credentials: 'include',
};

export const instance = ky.create({
  prefixUrl: API_URL,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    afterResponse: [
      async (request, _, response) => {
        if (!response.ok && response.status === 401 && !request.url.includes('logout')) {
          alert('로그인이 만료되었어요. 다시 로그인해주세요.');
          window.location.href = '/auth/login';
        }
        return response;
      },
    ],
  },
  ...defaultOption,
});

export async function resultify<T>(response: ResponsePromise) {
  return await response.json<T>();
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.patch(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};

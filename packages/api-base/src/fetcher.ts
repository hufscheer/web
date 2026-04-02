import type { Options, ResponsePromise } from 'ky';

import ky from 'ky';

const defaultOption: Options = {
  retry: 0,
  timeout: 30000,
  credentials: 'include',
};

export const getInstance = (apiUrl?: string) =>
  ky.create({
    prefixUrl: apiUrl,
    headers: { 'Content-Type': 'application/json' },
    hooks: {
      afterResponse: [
        async (request, _, response) => {
          if (!response.ok) {
            if (response.status === 401) {
              if (request.url.includes('logout')) return response;

              alert('로그인이 만료되었어요. 다시 로그인해주세요.');
              window.location.href = '/auth/login';
              return response;
            }

            try {
              const cloned = response.clone();
              const body: unknown = await cloned.json().catch(() => cloned.text());
              console.error(
                `[API Error] ${response.status} ${request.method} ${request.url}`,
                body,
              );
            } catch {
              console.error(`[API Error] ${response.status} ${request.method} ${request.url}`);
            }
          }
          return response;
        },
      ],
    },
    ...defaultOption,
  });

export async function resultify<T>(response: ResponsePromise) {
  const res = await response;

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json') || ct.includes('+json')) {
    return res.json<T>();
  }
  return (await res.text()) as unknown as T;
}

export const getFetcher = (apiUrl: string) => {
  const { get, post, put, patch, delete: del } = getInstance(apiUrl);

  return {
    get: <T>(pathname: string, options?: Options) => resultify<T>(get(pathname, options)),
    post: <T>(pathname: string, options?: Options) => resultify<T>(post(pathname, options)),
    put: <T>(pathname: string, options?: Options) => resultify<T>(put(pathname, options)),
    patch: <T>(pathname: string, options?: Options) => resultify<T>(patch(pathname, options)),
    delete: <T>(pathname: string, options?: Options) => resultify<T>(del(pathname, options)),
  };
};

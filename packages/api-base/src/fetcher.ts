import type { Options, ResponsePromise } from 'ky';

import ky from 'ky';

const defaultOption: Options = {
  retry: 0,
  timeout: 30000,
  credentials: 'include',
  throwHttpErrors: true,
};

export type HttpErrorHandler = (request: Request, response: Response) => void | Promise<void>;

export type HttpErrorHandlers = Partial<Record<number, HttpErrorHandler>>;

export type FetcherConfig = {
  errorHandlers?: HttpErrorHandlers;
};

export const getInstance = (apiUrl?: string, config: FetcherConfig = {}) =>
  ky.create({
    prefixUrl: apiUrl,
    headers: { 'Content-Type': 'application/json' },
    hooks: {
      afterResponse: [
        async (request, _, response) => {
          if (!response.ok) {
            await config.errorHandlers?.[response.status]?.(request, response);
          }
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
export const getFetcher = (apiUrl: string, config?: FetcherConfig) => {
  const { get, post, put, patch, delete: del } = getInstance(apiUrl, config);

  return {
    get: <T>(pathname: string, options?: Options) => resultify<T>(get(pathname, options)),
    post: <T>(pathname: string, options?: Options) => resultify<T>(post(pathname, options)),
    put: <T>(pathname: string, options?: Options) => resultify<T>(put(pathname, options)),
    patch: <T>(pathname: string, options?: Options) => resultify<T>(patch(pathname, options)),
    delete: <T>(pathname: string, options?: Options) => resultify<T>(del(pathname, options)),
  };
};

import type { Options, ResponsePromise } from 'ky';

import ky from 'ky';

type KyHooks = NonNullable<Options['hooks']>;

const defaultOption: Options = {
  retry: 0,
  timeout: 30000,
  credentials: 'include',
  throwHttpErrors: true,
};

const defaultHeaders = new Headers({ 'Content-Type': 'application/json' });

export type FetcherConfig = Options;

const mergeHeaders = (headers?: HeadersInit) => {
  const mergedHeaders = new Headers(defaultHeaders);

  if (headers) {
    new Headers(headers).forEach((value, key) => {
      mergedHeaders.set(key, value);
    });
  }

  return mergedHeaders;
};

const mergeHooks = (hooks: KyHooks = {}): KyHooks => ({
  beforeRequest: [...(hooks.beforeRequest ?? [])],
  beforeRetry: [...(hooks.beforeRetry ?? [])],
  beforeError: [...(hooks.beforeError ?? [])],
  afterResponse: [...(hooks.afterResponse ?? [])],
});

export const getInstance = (apiUrl?: string, config: FetcherConfig = {}) => {
  const { headers, hooks, ...options } = config;

  return ky.create({
    ...defaultOption,
    ...options,
    prefixUrl: apiUrl,
    headers: mergeHeaders(headers),
    hooks: mergeHooks(hooks),
  });
};

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

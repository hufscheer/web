import type { Options, ResponsePromise } from 'ky';
import ky from 'ky';

const API_URL = typeof window === 'undefined' ? 'https://api.hufscheer.com' : '/api/v1';

const defaultOption: Options = {
  retry: 0,
  timeout: 30000,
};

export const instance = ky.create({
  prefixUrl: API_URL,
  headers: { 'Content-Type': 'application/json' },
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

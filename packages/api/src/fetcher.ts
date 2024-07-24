import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const host =
  typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const port = typeof window !== 'undefined' ? window.location.port : '3000';
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

const baseURL = port
  ? `${protocol}://${host}:${port}/api`
  : `${protocol}://${host}/api`;

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const request = async <T>(promise: Promise<AxiosResponse<T>>) => {
  const response = await promise;
  return response.data;
};

export const fetcher = {
  get: <T>(pathname: string, config?: AxiosRequestConfig) =>
    request<T>(instance.get(pathname, config)),
  post: <T>(pathname: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(instance.post<T>(pathname, data, config)),
  put: <T>(pathname: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(instance.put<T>(pathname, data, config)),
  delete: <T>(pathname: string, config?: AxiosRequestConfig) =>
    request<T>(instance.delete<T>(pathname, config)),
};

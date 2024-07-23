import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL: string = import.meta.env.VITE_BASE_API_URL;

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

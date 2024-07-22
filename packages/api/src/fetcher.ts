import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const request = async <T>(promise: Promise<AxiosResponse<T>>) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetcher = {
  get: <T>(pathname: string, config?: AxiosRequestConfig) =>
    request<T>(instance.get(pathname, config)),
  post: <T>(pathname: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(instance.post<T>(pathname, data, config)),
  put: <T>(pathname: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(instance.put<T>(pathname, data, config)),
  delete: <T>(pathname: string, config?: AxiosRequestConfig) =>
    request<T>(instance.delete<T>(pathname, config)),
};

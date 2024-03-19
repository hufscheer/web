import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const existedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwODU2MTczLCJpYXQiOjE3MTA3Njk3NzMsImp0aSI6IjMzYWY5MGZhNjIwMjQ0NTA4NDM2MGJiYjEwMjdlZDk5IiwidXNlcl9pZCI6MX0.DGqgTz32HWvqfStgLgv0elQMfUWx3Vymvsn7frGIYbk';
  config.headers.Authorization = `Bearer ${existedToken}`;

  return config;
};

instance.interceptors.request.use(onRequest);

export default instance;

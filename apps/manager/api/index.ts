import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/json',
  },
});

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const tokenInLocalStorage = localStorage.getItem('accessToken');

    if (tokenInLocalStorage) return tokenInLocalStorage;
  } else return null;
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  const existedToken = getAccessToken();
  config.headers.Authorization = `Bearer ${existedToken}`;

  return config;
};

instance.interceptors.request.use(onRequest);

export default instance;

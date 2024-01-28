import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_OFFICE_BASE_URL,
  headers: {
    Authorization: `Bearer `,
    'Content-Type': 'application/json',
  },
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const existedToken = getAccessToken();
  config.headers.Authorization = `Bearer ${existedToken}`;

  return config;
};

instance.interceptors.request.use(onRequest);

const onResponse = (res: AxiosResponse) => {
  retryCounter = 0;
  return res;
};

let retryCounter = 0;

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const tokenInLocalStorage = localStorage.getItem('token');

    if (tokenInLocalStorage) return tokenInLocalStorage;
  } else return null;
};

const alertError = async (message: string) => {
  alert(message);
  return;
};

const onError = async (error: AxiosError | Error) => {
  if (isAxiosError(error)) {
    switch (error.response?.status) {
      case 400: {
        alertError('400: 잘못된 요청입니다.');
        break;
      }
      case 401: {
        if (retryCounter < 3) {
          retryCounter++;
          try {
            const existedToken = getAccessToken();
            if (!existedToken) throw new Error('no accessible token');
            return await instance({
              ...error.config,
              headers: { Authorization: `Bearer ${existedToken}` },
            });
          } catch (e) {
            const message =
              e instanceof Error ? e.message : '401: 로그인이 필요합니다.';
            alertError(message);
            return (window.location.href = '/login');
          }
        } else {
          alertError(
            '재시도 횟수를 초과하였습니다. 로그인 페이지로 이동합니다.',
          );
          return (window.location.href = '/login');
        }
      }
      case 403: {
        alertError('403: 권한이 필요합니다.');
        break;
      }
      case 404: {
        alertError('404: 잘못된 요청입니다.');
        break;
      }
      case 500: {
        alertError('500: 서버에 문제가 발생했습니다.');
        break;
      }
      default: {
        alertError('알 수 없는 오류입니다.');
        break;
      }
    }
  } else {
    alertError(error.message);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(onResponse, onError);

export default instance;

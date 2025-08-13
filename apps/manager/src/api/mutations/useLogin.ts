import { fetcher, useMutation } from '@hcc/api-base';

type Request = {
  email: string;
  password: string;
};

export const postLogin = (request: Request) => {
  return fetcher.post<void>('manager/login', { json: request });
};

export const useLogin = () => useMutation({ mutationFn: postLogin });

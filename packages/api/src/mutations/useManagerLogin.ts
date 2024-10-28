import { useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';

type Request = {
  email: string;
  password: string;
};

const postManagerLogin = ({ email, password }: Request) =>
  fetcher.post<void>('/manager/login', { email, password });

const useManagerLogin = () => useMutation({ mutationFn: postManagerLogin });

export default useManagerLogin;

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import { postLogin } from '@/api/auth';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';

export default function useLoginMutation() {
  const router = useRouter();
  const params = useSearchParams();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ access }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('aceessToken', access);
      }

      const redirectPath = params.get('redirectPath');

      if (redirectPath) router.replace(redirectPath);
      else router.replace('/');
    },
  });
}

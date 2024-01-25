import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postLogin } from '@/api/auth';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';

export default function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_LOGIN],
    mutationFn: postLogin,
    onSuccess: ({ access }) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', access);
      }

      router.push('/admin/league');
    },
  });
}

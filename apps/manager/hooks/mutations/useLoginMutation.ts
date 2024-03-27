import { useMutation } from '@tanstack/react-query';

import { postLogin } from '@/api/auth';
import { ADMIN_MUTATION_KEY } from '@/constants/mutationKey';

export default function useLoginMutation() {
  return useMutation({
    mutationKey: [ADMIN_MUTATION_KEY.POST_LOGIN],
    mutationFn: postLogin,
  });
}

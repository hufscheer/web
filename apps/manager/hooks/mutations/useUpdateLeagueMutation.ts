import { useMutation } from '@tanstack/react-query';

import { updateLeague } from '@/api/league';

export default function useUpdateLeagueMutation() {
  return useMutation({
    mutationFn: updateLeague,
  });
}

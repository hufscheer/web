import { useMutation } from '@tanstack/react-query';

import { deleteLeague } from '@/api/league';

type Params = {
  leagueId: number;
};

export default function useDeleteLeagueMutation() {
  return useMutation({
    mutationFn: ({ leagueId }: Params) => deleteLeague({ leagueId }),
  });
}

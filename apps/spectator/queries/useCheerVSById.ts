import { useSuspenseQueries } from '@tanstack/react-query';

import { getGameById, getGameCheerById } from '@/api/game';
import { GameType } from '@/types/game';

export const useCheerVSById = (gameId: string) => {
  const [
    { data: cheers, error: cheersError },
    { data: gameTeams, error: gameTeamsError },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['game-cheer', gameId],
        queryFn: () => getGameCheerById(gameId),
      },
      {
        queryKey: ['game-detail', 'for-cheer', gameId],
        queryFn: () => getGameById(gameId),
        select: (data: GameType) => data.gameTeams,
      },
    ],
  });

  if (cheersError) throw cheersError;
  if (gameTeamsError) throw gameTeamsError;

  const firstTeam = { ...cheers[0], ...gameTeams[0] };
  const secondTeam = { ...cheers[1], ...gameTeams[1] };

  return {
    firstTeam,
    secondTeam,
  };
};

// import { useSuspenseQueries } from '@tanstack/react-query';

// import { getGameById, getGameCheerById } from '@/api/game';
// import { GameCheerType, GameTeamType, GameType } from '@/types/game';

// type CheerVSReturn = GameCheerType & GameTeamType;

// const INITIAL_RESULT = {
//   firstTeam: {} as CheerVSReturn,
//   secondTeam: {} as CheerVSReturn,
// };

// export const useCheerVSById = (gameId: string): typeof INITIAL_RESULT => {
//   const { firstTeam, secondTeam } = useSuspenseQueries({
//     queries: [
//       {
//         queryKey: ['game-cheer', gameId],
//         queryFn: () => getGameCheerById(gameId),
//         refetchInterval: 1000 * 5,
//       },
//       {
//         queryKey: ['game-detail', 'for-cheer', gameId],
//         queryFn: () => getGameById(gameId),
//         refetchInterval: 1000 * 5,
//         select: (data: GameType) => data.gameTeams,
//       },
//     ],
//     combine: results => ({
//       ...results.reduce((acc, cur) => {
//         if (cur.isPending) return acc;

//         const [first, second] = cur.data;

//         return {
//           firstTeam: { ...acc.firstTeam, ...first },
//           secondTeam: { ...acc.secondTeam, ...second },
//         };
//       }, INITIAL_RESULT),
//       pending: results.some(result => result.isPending),
//       error: results.find(result => result.isError),
//     }),
//   });

//   return {
//     firstTeam,
//     secondTeam,
//   };
// };

import type { SportType } from '~/api';

type SportRouteParams = { sport: SportType };
type TeamRouteParams = { id: number; sport: SportType };
type GamesRouteParams = { id: number; sport: SportType };
type LeaguesRouteParams = { id: number; sport: SportType };

export const routes = {
  root: '/',
  home: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}`,
  calendar: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}/calendar`,

  teams: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}/teams`,
  team: ({ id, sport }: TeamRouteParams) => `/${sport.toLocaleLowerCase()}/teams/${id}`,

  games: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}/games`,
  game: ({ id, sport }: GamesRouteParams) => `/${sport.toLocaleLowerCase()}/games/${id}`,

  previous: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}/previous`,
  leagues: ({ sport }: SportRouteParams) => `/${sport.toLocaleLowerCase()}/leagues`,
  league: ({ id, sport }: LeaguesRouteParams) => `/${sport.toLocaleLowerCase()}/leagues/${id}`,
};

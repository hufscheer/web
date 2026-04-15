import type { SportType } from '~/api';

type GamesRouteParams = { id: number; sport: SportType };

export const routes = {
  home: '/',
  calendar: '/calendar',

  teams: '/teams',
  team: (id: number) => `/teams/${id}`,

  games: '/games',
  game: ({ id, sport }: GamesRouteParams) => `/games/${sport.toLocaleLowerCase()}/${id}`,

  leagues: '/leagues',
  league: (id: number) => `/leagues/${id}`,
};

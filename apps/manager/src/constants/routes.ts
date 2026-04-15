import type { SportType } from '~/api/types';

const sportPath = (sportType: SportType) => sportType.toLowerCase();

export const routes = {
  home: '',
  login: 'auth/login',

  league: (id: number) => `leagues/${id}`,
  league_manage: (id: number) => `leagues/${id}/manage`,
  leagues: 'leagues',
  leagues_create: 'leagues/create',

  player: (id: number) => `players/${id}`,
  players: 'players',
  players_create: 'players/create',

  teams: 'teams',
  teams_create: 'teams/create',

  game: (leagueId: number, id: number, sportType: SportType) =>
    `leagues/${leagueId}/${sportPath(sportType)}/${id}`,
  game_timeline: (leagueId: number, gameId: number, sportType: SportType) =>
    `leagues/${leagueId}/${sportPath(sportType)}/${gameId}/timeline`,
  game_create: (leagueId: number) => `leagues/${leagueId}/create-game`,

  cheertalks: 'cheertalks',
  cheertalk_block: 'cheertalks/blocked',

  league_cheertalks: (id: number) => `leagues/${id}/cheertalks`,
  league_cheertalk_block: (id: number) => `leagues/${id}/cheertalks/blocked`,

  game_cheertalks: (leagueId: number, gameId: number, sportType: SportType) =>
    `leagues/${leagueId}/${sportPath(sportType)}/${gameId}/cheertalks`,
  game_cheertalk_block: (leagueId: number, gameId: number, sportType: SportType) =>
    `leagues/${leagueId}/${sportPath(sportType)}/${gameId}/cheertalks/blocked`,
} as const;

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

  game: (leagueId: number, id: number) => `leagues/${leagueId}/${id}`,
  game_timeline: (leagueId: number, id: number) => `leagues/${leagueId}/${id}/timeline`,
  game_create: (leagueId: number) => `leagues/${leagueId}/create-game`,

  cheertalk: 'cheertalks',
  cheertalk_block: 'cheertalks/blocked',
} as const;

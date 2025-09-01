export const routes = {
  home: '',
  calendar: 'calendar',

  teams: 'teams',
  team: (id: number) => `teams/${id}`,

  games: 'games',
  game: (id: number) => `games/${id}`,
};

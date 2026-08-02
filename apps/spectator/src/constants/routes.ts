import type { SportType } from '~/api';

type OrgScope = { orgId: number };
type SportRouteParams = OrgScope & { sport: SportType };
type TeamRouteParams = OrgScope & { id: number; sport: SportType };
type GamesRouteParams = OrgScope & { id: number; sport: SportType };
type LeaguesRouteParams = OrgScope & { id: number; sport: SportType };

const sportSegment = (sport: SportType) => sport.toLocaleLowerCase();
const orgSegment = (orgId: number) => `/org/${orgId}`;

const orgSport = ({ orgId, sport }: SportRouteParams) =>
  `${orgSegment(orgId)}/${sportSegment(sport)}`;

export const routes = {
  root: '/',
  welcome: '/welcome',
  org: ({ orgId }: OrgScope) => orgSegment(orgId),
  home: (params: SportRouteParams) => orgSport(params),
  calendar: (params: SportRouteParams) => `${orgSport(params)}/calendar`,

  teams: (params: SportRouteParams) => `${orgSport(params)}/teams`,
  team: ({ id, ...rest }: TeamRouteParams) => `${orgSport(rest)}/teams/${id}`,

  games: (params: SportRouteParams) => `${orgSport(params)}/games`,
  game: ({ id, ...rest }: GamesRouteParams) => `${orgSport(rest)}/games/${id}`,

  previous: (params: SportRouteParams) => `${orgSport(params)}/previous`,
  leagues: (params: SportRouteParams) => `${orgSport(params)}/leagues`,
  league: ({ id, ...rest }: LeaguesRouteParams) => `${orgSport(rest)}/leagues/${id}`,
};

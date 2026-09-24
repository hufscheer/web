import type { Game, SportType } from '~/types';

const sportPath = (sportType: SportType) => sportType.toLowerCase();

/** 서버 경기 조회 응답에는 종목이 없어서 URL 세그먼트로 판별한다 */
export const SPORT_BY_PATH: Record<string, SportType> = {
  soccer: 'SOCCER',
  basketball: 'BASKETBALL',
};

export const routes = {
  home: '/',
  login: '/auth/login',
  leagues: '/leagues',
  leagueCreate: '/leagues/create',
  league: (id: number) => `/leagues/${id}`,
  leagueManage: (id: number) => `/leagues/${id}/manage`,
  leagueBracket: (id: number) => `/leagues/${id}/bracket`,
  /** 대진표 빈 칸에서 넘어올 때 라운드와 두 팀을 미리 채운다 */
  gameCreate: (
    leagueId: number,
    prefill?: { round: number; teamIds?: number[]; thirdPlace?: boolean },
  ) => {
    const path = `/leagues/${leagueId}/create-game`;
    if (!prefill) return path;

    const query = new URLSearchParams({ round: String(prefill.round) });
    if (prefill.teamIds?.length) query.set('teams', prefill.teamIds.join(','));
    if (prefill.thirdPlace) query.set('thirdPlace', '1');
    return `${path}?${query}`;
  },
  game: (leagueId: number, gameId: number, sportType: SportType) =>
    `/leagues/${leagueId}/${sportPath(sportType)}/${gameId}`,
  gameTimeline: (leagueId: number, gameId: number, sportType: SportType) =>
    `/leagues/${leagueId}/${sportPath(sportType)}/${gameId}/timeline`,
  gameTimelineOf: (game: Game) =>
    `/leagues/${game.leagueId}/${sportPath(game.sportType)}/${game.gameId}/timeline`,
  teams: (sport: SportType = 'SOCCER') => `/teams/${sportPath(sport)}`,
  teamCreate: (sport: SportType) => `/teams/${sportPath(sport)}/create`,
  team: (sport: SportType, teamId: number) => `/teams/${sportPath(sport)}/${teamId}`,
  players: '/players',
  playerCreate: '/players/create',
  player: (playerId: number) => `/players/${playerId}`,
  cheertalks: '/cheertalks',
  leagueCheertalks: (leagueId: number) => `/leagues/${leagueId}/cheertalks`,
  gameCheertalks: (leagueId: number, gameId: number, sportType: SportType) =>
    `/leagues/${leagueId}/${sportPath(sportType)}/${gameId}/cheertalks`,
};

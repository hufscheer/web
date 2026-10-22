import type { Game, SportType } from '~/desktop/types';

/** 데스크탑 화면은 모바일과 같은 앱 안에서 이 접두사 아래에 둔다 */
export const BASE = '/desktop';

const sportPath = (sportType: SportType) => sportType.toLowerCase();

/** 서버 경기 조회 응답에는 종목이 없어서 URL 세그먼트로 판별한다 */
export const SPORT_BY_PATH: Record<string, SportType> = {
  soccer: 'SOCCER',
  basketball: 'BASKETBALL',
};

export const routes = {
  home: BASE,
  login: `${BASE}/auth/login`,
  leagues: `${BASE}/leagues`,
  leagueCreate: `${BASE}/leagues/create`,
  league: (id: number) => `${BASE}/leagues/${id}`,
  leagueManage: (id: number) => `${BASE}/leagues/${id}/manage`,
  leagueBracket: (id: number) => `${BASE}/leagues/${id}/bracket`,
  /** 대진표 빈 칸에서 넘어올 때 라운드와 두 팀을 미리 채운다 */
  gameCreate: (
    leagueId: number,
    prefill?: { round: number; teamIds?: number[]; thirdPlace?: boolean },
  ) => {
    const path = `${BASE}/leagues/${leagueId}/create-game`;
    if (!prefill) return path;

    const query = new URLSearchParams({ round: String(prefill.round) });
    if (prefill.teamIds?.length) query.set('teams', prefill.teamIds.join(','));
    if (prefill.thirdPlace) query.set('thirdPlace', '1');
    return `${path}?${query}`;
  },
  game: (leagueId: number, gameId: number, sportType: SportType) =>
    `${BASE}/leagues/${leagueId}/${sportPath(sportType)}/${gameId}`,
  /** 경기 수정 화면의 라인업 구역 */
  gameLineup: (leagueId: number, gameId: number, sportType: SportType) =>
    `${BASE}/leagues/${leagueId}/${sportPath(sportType)}/${gameId}#lineup`,
  gameTimeline: (leagueId: number, gameId: number, sportType: SportType) =>
    `${BASE}/leagues/${leagueId}/${sportPath(sportType)}/${gameId}/timeline`,
  gameTimelineOf: (game: Game) =>
    `${BASE}/leagues/${game.leagueId}/${sportPath(game.sportType)}/${game.gameId}/timeline`,
  teams: (sport: SportType = 'SOCCER') => `${BASE}/teams/${sportPath(sport)}`,
  teamCreate: (sport: SportType) => `${BASE}/teams/${sportPath(sport)}/create`,
  team: (sport: SportType, teamId: number) => `${BASE}/teams/${sportPath(sport)}/${teamId}`,
  players: `${BASE}/players`,
  playerCreate: `${BASE}/players/create`,
  player: (playerId: number) => `${BASE}/players/${playerId}`,
  cheertalks: `${BASE}/cheertalks`,
  leagueCheertalks: (leagueId: number) => `${BASE}/leagues/${leagueId}/cheertalks`,
  gameCheertalks: (leagueId: number, gameId: number, sportType: SportType) =>
    `${BASE}/leagues/${leagueId}/${sportPath(sportType)}/${gameId}/cheertalks`,
};

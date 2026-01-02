import type { GameType } from '~/api';

export type TeamType = {
  id: number;
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
};

export const TEAM_UNIT_LIST = [
  '영어대학',
  '서양어대학',
  '아시아언어문화대학',
  '중국학대학',
  '일본어대학',
  '사회과학대학',
  '상경대학',
  '경영대학',
  '사범대학',
  'AI융합대학',
  '국제학부',
  'LD/LT학부',
  'KFL학부',
  '자유전공학부',
  '기타',
] as const;

export type TeamUnitType = (typeof TEAM_UNIT_LIST)[number];

export type TeamListPayload = {
  units?: TeamUnitType | TeamUnitType[];
};

export type GameTeamType = {
  gameTeamId: number;
  gameTeamName: string;
  logoImageUrl: string;
  score: number;
  pkScore: number;
  teamColor: string;
};

export type TeamDetailPayload = {
  id: number;
};

export type TeamPlayerType = {
  playerId: number;
  teamPlayerId: number;
  name: string;
  studentNumber: string;
  totalGoalCount: number;
};

export type TopScorerType = {
  playerId: number;
  admissionYear: string;
  rank: number;
  playerName: string;
  totalGoals: number;
};

export type TrophyResultType = '우승' | '준우승';

export type TrophyType = {
  leagueId: number;
  leagueName: string;
  trophyType: TrophyResultType;
};

export type TeamDetailType = {
  teamId: number;
  name: string;
  logoImageUrl: string;
  unit: string;
  teamColor: string;
  teamPlayers: TeamPlayerType[];
  winCount: number;
  drawCount: number;
  loseCount: number;
  topScorers: TopScorerType[];
  trophies: TrophyType[];
};

export type TeamGamesPayload = {
  id: number;
};

export type TeamSummaryType = {
  teamDetail: TeamDetailType;
  recentGames: GameType[];
};

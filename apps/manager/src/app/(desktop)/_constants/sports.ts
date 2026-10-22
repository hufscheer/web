import type { Game, SportType } from '~/app/(desktop)/_types';

import { LEAGUE_STATE } from '~/api';
import { roundOptions } from '~/constants/leagues';

/** 순서는 서버 Position enum 의 DISPLAY_ORDER 와 같다. 대분류(FW·MF·DF·G·F)도 저장할 수 있다 */
export const POSITION_GROUPS: Record<
  SportType,
  { group: string; broad: string | null; items: string[] }[]
> = {
  SOCCER: [
    { group: '공격', broad: 'FW', items: ['LW', 'ST', 'RW'] },
    { group: '미드필더', broad: 'MF', items: ['LM', 'CM', 'RM'] },
    { group: '수비', broad: 'DF', items: ['LB', 'CB', 'RB'] },
    { group: '골키퍼', broad: null, items: ['GK'] },
  ],
  BASKETBALL: [
    { group: '가드', broad: 'G', items: ['PG', 'SG'] },
    { group: '포워드', broad: 'F', items: ['SF', 'PF'] },
    { group: '센터', broad: null, items: ['C'] },
  ],
};

type ProgressLike = { leagueProgress: string };
export const isLeagueRunning = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_STATE.IN_PROGRESS;
export const isLeagueBefore = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_STATE.SCHEDULED;
export const isLeagueDone = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_STATE.FINISHED;

const ROUND_LABEL: Record<number, string> = Object.fromEntries(
  roundOptions.map((option) => [option.round, option.label]),
);

/** 결승과 3·4위전은 round 가 둘 다 2라서 thirdPlaceMatch 를 같이 넘겨야 한다 */
export const roundLabel = (round: number, thirdPlaceMatch = false) => {
  if (round === 2 && thirdPlaceMatch) return '3·4위전';
  return ROUND_LABEL[round] ?? `${round}강`;
};

export const roundLabelOf = (game: Game) => roundLabel(game.round, game.thirdPlaceMatch);

export const roundsUpTo = (maxRound: number) => {
  if (maxRound >= 100) return [100];
  const rounds: number[] = [];
  for (let r = maxRound; r >= 2; r = Math.floor(r / 2)) rounds.push(r);
  return rounds;
};

export const matchup = (game: Game) =>
  `${game.gameTeams[0].gameTeamName} vs ${game.gameTeams[1].gameTeamName}`;

export const SPORT_COLOR: Record<SportType, string> = {
  SOCCER: 'var(--color-sport-soccer)',
  BASKETBALL: 'var(--color-sport-basketball)',
};

export const SPORT_COLOR_SOFT: Record<SportType, string> = {
  SOCCER: 'var(--color-sport-soccer-soft)',
  BASKETBALL: 'var(--color-sport-basketball-soft)',
};

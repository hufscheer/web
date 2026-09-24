import type { Game, SportType } from '~/types';

import { BasketballIcon, SportsAndOutdoorsIcon } from '~/components/icons';

export const SPORT_LABEL: Record<SportType, string> = { SOCCER: '축구', BASKETBALL: '농구' };

export const STARTER_LIMIT: Record<SportType, number> = { SOCCER: 11, BASKETBALL: 5 };

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

/** 서버 LeagueProgress 는 한글 라벨로 온다. 라벨 비교는 여기서만 한다 */
export const LEAGUE_PROGRESS = {
  BEFORE: '시작 전',
  RUNNING: '진행 중',
  DONE: '종료',
} as const;

type ProgressLike = { leagueProgress: string };
export const isLeagueRunning = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_PROGRESS.RUNNING;
export const isLeagueBefore = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_PROGRESS.BEFORE;
export const isLeagueDone = (league: ProgressLike) =>
  league.leagueProgress === LEAGUE_PROGRESS.DONE;

const ROUND_LABEL: Record<number, string> = { 100: '예선', 4: '준결승', 2: '결승' };

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

export const SportIcon = ({
  sportType,
  size = 14,
  className,
  colored,
}: {
  sportType: SportType;
  size?: number;
  className?: string;
  colored?: boolean;
}) => {
  const style = colored ? { color: SPORT_COLOR[sportType] } : undefined;
  const cls = className ?? `shrink-0 ${colored ? '' : 'text-[var(--color-neutral-400)]'}`;

  return sportType === 'SOCCER' ? (
    <SportsAndOutdoorsIcon size={size} className={cls} style={style} />
  ) : (
    <BasketballIcon size={size} className={cls} style={style} />
  );
};

export const SportTag = ({ sportType, soft }: { sportType: SportType; soft?: boolean }) => (
  <span
    className={
      soft
        ? 'text-t7 inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] px-2 py-0.5 font-semibold'
        : 'inline-flex items-center gap-1.5 font-medium'
    }
    style={{
      color: SPORT_COLOR[sportType],
      ...(soft ? { backgroundColor: SPORT_COLOR_SOFT[sportType] } : {}),
    }}
  >
    <SportIcon sportType={sportType} size={13} colored />
    {SPORT_LABEL[sportType]}
  </span>
);

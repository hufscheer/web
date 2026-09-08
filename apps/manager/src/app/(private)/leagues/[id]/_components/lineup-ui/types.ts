import type { LeagueTeamsPlayerType } from '~/api';

/**
 * 라인업 화면 공용 타입. 컴포넌트(index.tsx)와 팝오버가 둘 다 참조하므로
 * 별도 파일로 뺀다 — index 에 두면 index ↔ 팝오버 순환 참조가 생긴다.
 */

export type TeamNum = 1 | 2;
export type LineupState = 'STARTER' | 'CANDIDATE';

/** 행 하나를 그리는 데 필요한 최소한. 생성·수정의 선택 상태 타입이 둘 다 이걸 만족한다 */
export type LineupEntry = {
  teamPlayerId: number;
  isCaptain: boolean;
};

export type TeamLineupView = {
  starters: LineupEntry[];
  candidates: LineupEntry[];
};

export type RosterPlayer = LeagueTeamsPlayerType;

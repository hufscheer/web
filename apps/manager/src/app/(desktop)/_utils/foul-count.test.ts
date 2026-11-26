import { describe, expect, it } from 'vitest';

import type { Lineup, LineupPlayer, TimelineRecord } from '~/app/(desktop)/_types';

import { countFouls, withFoulCounts } from './foul-count';

const player = (lineupPlayerId: number, playerName: string): LineupPlayer => ({
  lineupPlayerId,
  playerId: lineupPlayerId,
  playerName,
  jerseyNumber: lineupPlayerId,
  position: null,
  isCaptain: false,
  state: 'STARTER',
  isPlaying: true,
  isReplaced: false,
  replacedPlayerName: null,
});

const lineup = (gameTeamId: number, players: LineupPlayer[]): Lineup =>
  ({
    gameTeamId,
    teamName: `팀${gameTeamId}`,
    starterPlayers: players,
    candidatePlayers: [],
  }) as Lineup;

let id = 0;
const foul = (gameTeamId: number, playerName: string, lineupPlayerId?: number | null) =>
  ({
    recordId: (id += 1),
    type: 'FOUL',
    recordedQuarter: '1쿼터',
    recordedAt: 0,
    gameTeamId,
    title: playerName,
    subtitle: '파울',
    playerName,
    lineupPlayerId,
    deletable: false,
    undeletableReason: null,
    undeletableReasonCode: null,
  }) as TimelineRecord;

const foulsOf = (lineups: [Lineup, Lineup]) =>
  lineups.flatMap((l) => l.starterPlayers.map((p) => [p.lineupPlayerId, p.foulCount]));

describe('withFoulCounts', () => {
  const home = lineup(1, [player(1, '김민수'), player(2, '김민수'), player(3, '이서준')]);
  const away = lineup(2, [player(11, '김민수')]);

  it('같은 팀 동명이인의 파울을 라인업 id 로 따로 센다', () => {
    const records = [foul(1, '김민수', 1), foul(1, '김민수', 1), foul(1, '김민수', 2)];
    expect(foulsOf(withFoulCounts([home, away], records))).toEqual([
      [1, 2],
      [2, 1],
      [3, 0],
      [11, 0],
    ]);
  });

  it('라인업 id 가 없는 예전 기록은 팀과 이름으로 센다', () => {
    const records = [foul(2, '김민수', null), foul(2, '김민수')];
    expect(foulsOf(withFoulCounts([home, away], records))).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
      [11, 2],
    ]);
  });

  it('파울이 아닌 기록은 세지 않는다', () => {
    const score = { ...foul(1, '김민수', 1), type: 'SCORE' } as TimelineRecord;
    expect(countFouls([score]).size).toBe(0);
  });
});

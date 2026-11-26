import { describe, expect, it } from 'vitest';

import type { LineupEntry } from '../../../create-game/_components/lineup-panel';

import { type LineupApi, planTeam, runPlan } from './lineup-plan';

const entry = (playerId: number, over: Partial<LineupEntry> = {}): LineupEntry => ({
  teamPlayerId: playerId + 100,
  lineupPlayerId: playerId + 1000,
  playerId,
  playerName: `선수${playerId}`,
  jerseyNumber: playerId,
  state: 'STARTER',
  isCaptain: false,
  position: null,
  ...over,
});

/** 서버 호출을 순서대로 적어 두는 가짜 api. 새로 넣은 선수는 2000번대 id 를 돌려준다 */
const recordingApi = () => {
  const calls: string[] = [];
  let next = 2000;
  const api: LineupApi = {
    addLineup: async (v) => {
      calls.push(`add ${v.teamPlayerId} ${v.state} captain=${v.isCaptain}`);
      next += 1;
      return next;
    },
    removeLineup: async (v) => void calls.push(`remove ${v.lineupPlayerId}`),
    toStarter: async (v) => void calls.push(`starter ${v.lineupPlayerId}`),
    toCandidate: async (v) => void calls.push(`candidate ${v.lineupPlayerId}`),
    registerCaptain: async (v) => void calls.push(`captain ${v.lineupPlayerId}`),
    revokeCaptain: async (v) => void calls.push(`revoke ${v.lineupPlayerId}`),
    updatePosition: async (v) => void calls.push(`position ${v.lineupPlayerId} ${v.position}`),
  };
  return { api, calls };
};

describe('planTeam', () => {
  it('바뀐 게 없으면 할 일이 없다', () => {
    const lineup = [entry(1, { isCaptain: true }), entry(2), entry(3, { state: 'CANDIDATE' })];
    expect(planTeam(lineup, structuredClone(lineup))).toEqual({
      removes: [],
      demotes: [],
      promotes: [],
      adds: [],
      captain: null,
      positions: [],
    });
  });

  it('선발과 후보를 맞바꾸면 내리기와 올리기가 하나씩 생긴다', () => {
    const before = [entry(1), entry(2, { state: 'CANDIDATE' })];
    const after = [entry(1, { state: 'CANDIDATE' }), entry(2, { state: 'STARTER' })];
    const plan = planTeam(before, after);
    expect(plan.demotes).toEqual([{ lineupPlayerId: 1001 }]);
    expect(plan.promotes).toEqual([{ lineupPlayerId: 1002 }]);
  });

  it('라인업에서 뺀 선수는 지우고, 새 선수는 넣는다', () => {
    const before = [entry(1), entry(2)];
    const after = [
      entry(1),
      entry(2, { excluded: true }),
      entry(3, { lineupPlayerId: undefined, state: 'CANDIDATE' }),
    ];
    const plan = planTeam(before, after);
    expect(plan.removes).toEqual([{ lineupPlayerId: 1002 }]);
    expect(plan.adds).toEqual([
      { playerId: 3, teamPlayerId: 103, state: 'CANDIDATE', position: null },
    ]);
  });

  it('팀 명단에서 빠져 teamPlayerId 를 모르는 선수는 새로 넣지 않는다', () => {
    const plan = planTeam([], [entry(3, { lineupPlayerId: undefined, teamPlayerId: null })]);
    expect(plan.adds).toEqual([]);
  });

  it('선발의 포지션 변경만 보낸다(후보는 보내지 않는다)', () => {
    const before = [entry(1, { position: 'FW' }), entry(2, { state: 'CANDIDATE', position: 'DF' })];
    const after = [entry(1, { position: 'MF' }), entry(2, { state: 'CANDIDATE', position: 'GK' })];
    expect(planTeam(before, after).positions).toEqual([{ lineupPlayerId: 1001, position: 'MF' }]);
  });

  it('주장을 다른 선수로 옮기면 새 주장을 지정한다', () => {
    const before = [entry(1, { isCaptain: true }), entry(2)];
    const after = [entry(1), entry(2, { isCaptain: true })];
    expect(planTeam(before, after).captain).toEqual({ action: 'register', playerId: 2 });
  });

  it('주장 표시만 끄면 주장을 푼다', () => {
    const before = [entry(1, { isCaptain: true })];
    expect(planTeam(before, [entry(1)]).captain).toEqual({
      action: 'revoke',
      lineupPlayerId: 1001,
    });
  });

  it('주장을 후보로 내리면 서버가 주장을 풀어 주므로 다시 풀지 않는다', () => {
    const before = [entry(1, { isCaptain: true })];
    const after = [entry(1, { state: 'CANDIDATE' })];
    const plan = planTeam(before, after);
    expect(plan.demotes).toEqual([{ lineupPlayerId: 1001 }]);
    expect(plan.captain).toBeNull();
  });

  it('주장인 후보(생성 화면에서 만든 경기)를 열기만 해서는 주장이 풀리지 않는다', () => {
    const lineup = [entry(1, { state: 'CANDIDATE', isCaptain: true })];
    expect(planTeam(lineup, structuredClone(lineup)).captain).toBeNull();
  });

  it('주장을 빼고 새 선수를 주장으로 넣으면 넣은 뒤 지정한다', () => {
    const before = [entry(1, { isCaptain: true })];
    const after = [
      entry(1, { excluded: true, isCaptain: false }),
      entry(5, { lineupPlayerId: undefined, isCaptain: true }),
    ];
    const plan = planTeam(before, after);
    expect(plan.removes).toEqual([{ lineupPlayerId: 1001 }]);
    expect(plan.captain).toEqual({ action: 'register', playerId: 5 });
  });
});

describe('runPlan', () => {
  it('선발 수 제한에 걸리지 않게 빼기, 내리기, 올리기, 넣기, 주장, 포지션 순서로 보낸다', async () => {
    const before = [entry(1, { isCaptain: true }), entry(2), entry(3, { state: 'CANDIDATE' })];
    const after = [
      entry(1, { state: 'CANDIDATE', isCaptain: false }),
      entry(2, { excluded: true }),
      entry(3, { state: 'STARTER', position: 'GK' }),
      entry(4, { lineupPlayerId: undefined, isCaptain: true }),
    ];
    const { api, calls } = recordingApi();
    await runPlan(api, 9, 7, before, planTeam(before, after));
    expect(calls).toEqual([
      'remove 1002',
      'candidate 1001',
      'starter 1003',
      'add 104 STARTER captain=false',
      'captain 2001',
      'position 1003 GK',
    ]);
  });

  it('첫 실패에서 멈춘다', async () => {
    const before = [entry(1), entry(2, { state: 'CANDIDATE' })];
    const after = [entry(1, { state: 'CANDIDATE' }), entry(2, { state: 'STARTER' })];
    const { api, calls } = recordingApi();
    api.toCandidate = async () => {
      throw new Error('400');
    };
    await expect(runPlan(api, 9, 7, before, planTeam(before, after))).rejects.toThrow('400');
    expect(calls).toEqual([]);
  });
});

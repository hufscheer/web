import type { LineupEntry } from '../../../create-game/_components/lineup-panel';

/** 한 팀에서 서버에 보내야 할 일. 순서대로 실행하면 된다 */
export type TeamPlan = {
  /** 1. 라인업에서 뺀다 */
  removes: { lineupPlayerId: number }[];
  /** 2. 후보로 내린다(주장이면 서버가 주장도 푼다) */
  demotes: { lineupPlayerId: number }[];
  /** 3. 선발로 올린다 */
  promotes: { lineupPlayerId: number }[];
  /** 4. 새로 넣는다. 주장은 5단계에서 따로 지정한다 */
  adds: { playerId: number; teamPlayerId: number; state: 'STARTER' | 'CANDIDATE' }[];
  /** 5. 주장. 새로 넣은 선수의 id 는 4단계 뒤에야 알 수 있어 playerId 로 가리킨다 */
  captain:
    | { action: 'register'; playerId: number }
    | { action: 'revoke'; lineupPlayerId: number }
    | null;
};

export const isEmptyPlan = (plan: TeamPlan) =>
  plan.removes.length === 0 &&
  plan.demotes.length === 0 &&
  plan.promotes.length === 0 &&
  plan.adds.length === 0 &&
  plan.captain === null;

/**
 * 서버에 있는 라인업(original)과 화면에서 고친 라인업(edited)의 차이를 계산한다.
 * 선수는 playerId 로 맞춘다. 등록 여부는 excluded 가 아닌 것이다.
 */
export const planTeam = (original: LineupEntry[], edited: LineupEntry[]): TeamPlan => {
  const before = new Map(original.filter((p) => !p.excluded).map((p) => [p.playerId, p]));
  const after = new Map(edited.filter((p) => !p.excluded).map((p) => [p.playerId, p]));

  const plan: TeamPlan = { removes: [], demotes: [], promotes: [], adds: [], captain: null };

  for (const [playerId, was] of before) {
    const now = after.get(playerId);
    if (!now) {
      if (was.lineupPlayerId !== undefined)
        plan.removes.push({ lineupPlayerId: was.lineupPlayerId });
      continue;
    }
    if (was.lineupPlayerId === undefined) continue;
    if (was.state === 'STARTER' && now.state === 'CANDIDATE') {
      plan.demotes.push({ lineupPlayerId: was.lineupPlayerId });
    } else if (was.state === 'CANDIDATE' && now.state === 'STARTER') {
      plan.promotes.push({ lineupPlayerId: was.lineupPlayerId });
    }
  }

  for (const [playerId, now] of after) {
    if (before.has(playerId)) continue;
    // 명단에서 빠진 선수는 teamPlayerId 를 몰라 다시 넣을 수 없다. 화면에서도 막혀 있다
    if (now.teamPlayerId === null) continue;
    plan.adds.push({ playerId, teamPlayerId: now.teamPlayerId, state: now.state });
  }

  // 2단계에서 후보로 내린 주장은 서버가 이미 풀었으므로 "남아 있는 주장"이 아니다
  const demoted = new Set(plan.demotes.map((d) => d.lineupPlayerId));
  const surviving = [...before.values()].find(
    (p) =>
      p.isCaptain &&
      p.lineupPlayerId !== undefined &&
      after.has(p.playerId) &&
      !demoted.has(p.lineupPlayerId),
  );
  // 상태는 보지 않는다. 생성 화면은 후보도 주장으로 받아서, 그렇게 만든 경기를 열기만 해도 주장이 풀리면 안 된다
  const desired = [...after.values()].find((p) => p.isCaptain);

  if (!desired) {
    if (surviving?.lineupPlayerId !== undefined) {
      plan.captain = { action: 'revoke', lineupPlayerId: surviving.lineupPlayerId };
    }
  } else if (surviving?.playerId !== desired.playerId) {
    plan.captain = { action: 'register', playerId: desired.playerId };
  }

  return plan;
};

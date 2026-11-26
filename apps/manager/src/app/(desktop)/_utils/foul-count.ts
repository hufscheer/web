import type { Lineup, LineupPlayer, TimelineRecord } from '~/app/(desktop)/_types';

const byId = (lineupPlayerId: number) => `id:${lineupPlayerId}`;
const byName = (gameTeamId: number, playerName: string) => `name:${gameTeamId}:${playerName}`;

/**
 * 파울 기록을 선수별로 센다. 라인업 id 로 세어 같은 팀 동명이인이 합쳐지지 않게 한다.
 * 라인업 id 가 없는 기록(예전 서버 응답)만 팀과 이름으로 센다.
 */
export const countFouls = (records: TimelineRecord[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const record of records) {
    if (record.type !== 'FOUL') continue;
    const key =
      record.lineupPlayerId != null
        ? byId(record.lineupPlayerId)
        : record.playerName
          ? byName(record.gameTeamId, record.playerName)
          : null;
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
};

export const withFoulCounts = (
  lineups: [Lineup, Lineup],
  records: TimelineRecord[],
): [Lineup, Lineup] => {
  const counts = countFouls(records);
  const withFouls = (lineup: Lineup): Lineup => {
    const apply = (player: LineupPlayer): LineupPlayer => ({
      ...player,
      foulCount:
        (counts.get(byId(player.lineupPlayerId)) ?? 0) +
        (counts.get(byName(lineup.gameTeamId, player.playerName)) ?? 0),
    });
    return {
      ...lineup,
      starterPlayers: lineup.starterPlayers.map(apply),
      candidatePlayers: lineup.candidatePlayers.map(apply),
    };
  };
  return [withFouls(lineups[0]), withFouls(lineups[1])];
};

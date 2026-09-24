import type {
  GameDetailType,
  GameLineupType,
  GamesListPageResponse,
  GameTeamPlayerType,
  GameTeamType,
  LeagueDetailType,
  PlayerType,
  SportType,
  TeamType,
  TimelineRecordByType,
  TimelineResponseType,
} from '@hcc/manager-api';

import type {
  Game,
  GameTeam,
  League,
  Lineup,
  LineupPlayer,
  ManagerLeague,
  Player,
  Position,
  Team,
  TeamPlayerRow,
  TimelineRecord,
} from '~/types';

import { teamColorOf } from './team-color';

const toGameTeam = (team: GameTeamType | undefined, index: number): GameTeam => ({
  gameTeamId: team?.gameTeamId ?? -(index + 1),
  teamId: team?.teamId ?? null,
  gameTeamName: team?.gameTeamName ?? '팀 없음',
  teamColor: teamColorOf(index),
  logoImageUrl: team?.logoImageUrl ?? null,
  score: team?.score ?? 0,
  pkScore: team?.pkScore ?? 0,
});

/**
 * 엔드포인트마다 팀 순서가 다르다(점수순·id순). 화면은 순서로 팀 색과 좌우를 정하므로
 * gameTeamId 로 맞춘다. 삭제된 팀이 빠져 한쪽만 오는 경기도 있어 빈 자리는 채운다.
 */
export const toGameTeams = (teams: GameTeamType[] | null | undefined): [GameTeam, GameTeam] => {
  const sorted = [...(teams ?? [])].sort((a, b) => a.gameTeamId - b.gameTeamId);
  return [toGameTeam(sorted[0], 0), toGameTeam(sorted[1], 1)];
};

export const toGame = (game: GameDetailType, sportType: SportType): Game => ({
  gameId: game.gameId,
  leagueId: game.leagueId,
  leagueName: game.leagueName,
  gameName: game.gameName,
  sportType,
  state: game.state,
  round: game.round,
  thirdPlaceMatch: game.thirdPlaceMatch,
  startTime: game.startTime,
  isPkTaken: game.isPkTaken,
  gameQuarter: game.gameQuarter,
  gameTeams: toGameTeams(game.gameTeams),
  videoId: game.videoId,
});

/** 목록 응답에는 종목이 없어서 대회 목록에서 이어 붙인다 */
export const toGames = (
  page: GamesListPageResponse | undefined,
  sportOf: (leagueId: number) => SportType | undefined,
): Game[] =>
  (page?.content ?? []).flatMap((group) =>
    (group.games ?? []).map((game) => ({
      gameId: game.id,
      leagueId: group.leagueId,
      leagueName: group.leagueName,
      gameName: game.gameName,
      sportType: sportOf(group.leagueId) ?? 'SOCCER',
      state: game.state,
      round: game.round,
      thirdPlaceMatch: game.thirdPlaceMatch,
      startTime: game.startTime,
      isPkTaken: game.isPkTaken,
      gameQuarter: game.gameQuarter,
      gameTeams: toGameTeams(game.gameTeams),
      videoId: game.videoId,
    })),
  );

export const toLeague = (league: LeagueDetailType, leagueId: number): League => ({
  leagueId,
  name: league.name,
  startAt: league.startAt,
  endAt: league.endAt,
  maxRound: league.maxRound,
  inProgressRound: league.inProgressRound ?? league.maxRound,
  leagueProgress: league.leagueProgress,
  sportType: league.sportType,
  thirdPlaceMatchEnabled: league.thirdPlaceMatchEnabled,
  leagueTeamCount: league.leagueTeamCount,
});

export const toManagerLeague = (league: LeagueDetailType): ManagerLeague => ({
  leagueId: league.id,
  name: league.name,
  startAt: league.startAt,
  endAt: league.endAt,
  maxRound: league.maxRound,
  leagueProgress: league.leagueProgress,
  sportType: league.sportType,
  thirdPlaceMatchEnabled: league.thirdPlaceMatchEnabled,
  leagueTeamCount: league.sizeOfLeagueTeams,
});

const toLineupPlayer = (player: GameTeamPlayerType): LineupPlayer => ({
  lineupPlayerId: player.lineupPlayerId,
  playerId: player.playerId,
  playerName: player.playerName,
  jerseyNumber: player.jerseyNumber ?? 0,
  position: (player.position ?? null) as Position | null,
  isCaptain: player.isCaptain,
  state: player.state,
  isPlaying: player.state === 'STARTER' ? !player.isReplaced : player.isReplaced,
  isReplaced: player.isReplaced,
  replacedPlayerName: player.replacedPlayer?.playerName ?? null,
});

export const toLineups = (lineups: GameLineupType[] | undefined): [Lineup, Lineup] => {
  const toLineup = (lineup: GameLineupType | undefined, index: number): Lineup => ({
    gameTeamId: lineup?.gameTeamId ?? -(index + 1),
    teamName: lineup?.teamName ?? '팀 없음',
    starterPlayers: (lineup?.starterPlayers ?? []).map(toLineupPlayer),
    candidatePlayers: (lineup?.candidatePlayers ?? []).map(toLineupPlayer),
  });
  return [toLineup(lineups?.[0], 0), toLineup(lineups?.[1], 1)];
};

type AnyRecord = TimelineRecordByType;

const PROGRESS_LABEL: Record<string, string> = {
  QUARTER_START: '쿼터 시작',
  QUARTER_END: '쿼터 종료',
  GAME_START: '경기 시작',
  GAME_END: '경기 종료',
};

const recordTitle = (record: AnyRecord, quarterLabel: string): string => {
  const who = record.playerName ?? '';
  if (record.type === 'SCORE') {
    const score = record.scoreRecord?.score ?? 1;
    return score > 1 ? `${who} ${score}점` : `${who} 득점`;
  }
  if (record.type === 'OWN_GOAL') return `${who} 자책골`;
  if (record.type === 'PK')
    return `${who} 승부차기 ${record.pkRecord?.isSuccess ? '성공' : '실패'}`;
  if (record.type === 'FOUL') return `${who} 파울`;
  if (record.type === 'WARNING_CARD') return `${who} 경고`;
  if (record.type === 'GAME_PROGRESS') {
    // 서버는 어느 쿼터인지를 묶음(gameQuarter)으로만 준다
    const kind = record.progressRecord?.gameProgressType;
    if (kind === 'QUARTER_START') return `${quarterLabel} 시작`;
    if (kind === 'QUARTER_END') return `${quarterLabel} 종료`;
    return (kind && PROGRESS_LABEL[kind]) || kind || '경기 진행';
  }
  // 서버는 들어온 선수 이름만 준다. 나간 선수 이름 필드는 응답에 없다
  const replaced = record.replacementRecord?.replacedPlayerName;
  if (record.replacementRecord) return replaced ? `${replaced} 교체 투입` : '선수 교체';
  return who || '기록';
};

const ownGoalScore = (record: AnyRecord) =>
  record.type === 'OWN_GOAL' ? record.ownGoalRecord.score : undefined;

export const toTimeline = (timeline: TimelineResponseType | undefined): TimelineRecord[] =>
  (timeline?.timelines ?? []).flatMap((group) =>
    (group.records ?? []).map((record) => {
      const snapshot = record.scoreRecord?.snapshot;
      return {
        recordId: record.recordId,
        type: record.type,
        recordedQuarter: group.gameQuarter.label,
        recordedAt: record.recordedAt,
        gameTeamId: record.gameTeamId,
        title: recordTitle(record, group.gameQuarter.label),
        subtitle: record.teamName ?? '',
        snapshot: snapshot
          ? ([snapshot[0]?.score ?? 0, snapshot[1]?.score ?? 0] as [number, number])
          : null,
        scoreValue: record.scoreRecord?.score ?? ownGoalScore(record) ?? 1,
        deletable: record.deletable ?? false,
        undeletableReason: record.undeletableReason ?? null,
        undeletableReasonCode: record.undeletableReasonCode ?? null,
      };
    }),
  );

export const toTeam = (team: TeamType): Team => ({
  teamId: team.id,
  name: team.name,
  sportType: team.sportType,
  unitName: team.unit,
  logoColor: team.teamColor ?? '#79828c',
  logoImageUrl: team.logoImageUrl || null,
});

export const toPlayer = (player: PlayerType): Player => ({
  playerId: player.playerId,
  name: player.name,
  studentNumber: player.studentNumber,
  teams: (player.teams ?? []).map((team) => ({
    teamId: team.id,
    teamName: team.name,
    sportType: team.sportType,
  })),
});

export const toTeamPlayerRows = (players: PlayerType[] | undefined): TeamPlayerRow[] =>
  (players ?? []).flatMap((player) =>
    player.teamPlayerId == null
      ? []
      : [
          {
            playerId: player.playerId,
            teamPlayerId: player.teamPlayerId,
            name: player.name,
            studentNumber: player.studentNumber,
            jerseyNumber: player.jerseyNumber ?? null,
          },
        ],
  );

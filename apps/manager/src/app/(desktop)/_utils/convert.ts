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
} from '~/api';
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
  TimelineType,
} from '~/app/(desktop)/_types';

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

/**
 * 서버는 지금 뛰고 있는 선수(is_playing)를 starterPlayers 에, 나머지를 candidatePlayers 에
 * 담아 준다. 교체 여부(isReplaced)로 다시 추정하면 나갔다가 다시 들어온 선수가 후보로 보였다.
 */
const toLineupPlayer = (player: GameTeamPlayerType, isPlaying: boolean): LineupPlayer => ({
  lineupPlayerId: player.lineupPlayerId,
  playerId: player.playerId,
  playerName: player.playerName,
  jerseyNumber: player.jerseyNumber ?? 0,
  position: (player.position ?? null) as Position | null,
  isCaptain: player.isCaptain,
  state: player.state,
  isPlaying,
  isReplaced: player.isReplaced,
  replacedPlayerName: player.replacedPlayer?.playerName ?? null,
});

export const toLineups = (lineups: GameLineupType[] | undefined): [Lineup, Lineup] => {
  const toLineup = (lineup: GameLineupType | undefined, index: number): Lineup => ({
    gameTeamId: lineup?.gameTeamId ?? -(index + 1),
    teamName: lineup?.teamName ?? '팀 없음',
    starterPlayers: (lineup?.starterPlayers ?? []).map((p) => toLineupPlayer(p, true)),
    candidatePlayers: (lineup?.candidatePlayers ?? []).map((p) => toLineupPlayer(p, false)),
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

type CopyInput = {
  type: TimelineType;
  sportType?: SportType;
  /** 기록 대상 선수. 교체는 나간 선수 */
  player?: string | null;
  assist?: string | null;
  score?: number | null;
  cardType?: 'YELLOW' | 'RED' | null;
  pkSuccess?: boolean | null;
  /** 교체로 들어온 선수 */
  incoming?: string | null;
  foulOut?: boolean | null;
  /** GAME_PROGRESS 문구 */
  progressTitle?: string;
};

/** 서버 기록과 저장 중 임시 기록이 같은 문구를 쓰도록 한곳에서 만든다. title 은 굵은 줄, subtitle 은 종류 줄 */
export const recordCopy = (input: CopyInput): { title: string; subtitle: string } => {
  const who = input.player ?? '';
  switch (input.type) {
    case 'SCORE': {
      const assist = input.assist ? `${input.assist} 도움` : '';
      if (input.sportType === 'BASKETBALL') {
        const base = input.score === 1 ? '자유투' : `${input.score ?? 2}점슛`;
        return { title: who, subtitle: input.score === 1 || !assist ? base : `${base} ${assist}` };
      }
      return { title: who, subtitle: assist || '득점' };
    }
    case 'OWN_GOAL':
      return { title: who, subtitle: '자책골' };
    case 'WARNING_CARD':
      return { title: who, subtitle: input.cardType === 'RED' ? '퇴장' : '경고' };
    case 'FOUL':
      return { title: who, subtitle: '파울' };
    case 'PK':
      return { title: who, subtitle: input.pkSuccess ? '승부차기 성공' : '승부차기 실축' };
    case 'SOCCER_REPLACEMENT':
    case 'BASKETBALL_REPLACEMENT':
      return {
        title: `${input.incoming ?? ''} IN`,
        subtitle: `${who} ${input.foulOut ? '파울아웃' : 'OUT'}`,
      };
    case 'GAME_PROGRESS':
      return { title: input.progressTitle ?? '경기 진행', subtitle: '' };
  }
};

const progressTitle = (record: AnyRecord, quarterLabel: string): string => {
  // 서버는 어느 쿼터인지를 묶음(gameQuarter)으로만 준다
  const kind = record.progressRecord?.gameProgressType;
  if (kind === 'QUARTER_START') return `${quarterLabel} 시작`;
  if (kind === 'QUARTER_END') return `${quarterLabel} 종료`;
  return (kind && PROGRESS_LABEL[kind]) || kind || '경기 진행';
};

const ownGoalScore = (record: AnyRecord) =>
  record.type === 'OWN_GOAL' ? record.ownGoalRecord.score : undefined;

export const toTimeline = (
  timeline: TimelineResponseType | undefined,
  sportType?: SportType,
): TimelineRecord[] =>
  (timeline?.timelines ?? []).flatMap((group) =>
    (group.records ?? []).map((record) => {
      const card = record.warningCardRecord?.warningCardType;
      const cardType = card === 'YELLOW' || card === 'RED' ? card : null;
      const pkSuccess = record.pkRecord?.isSuccess ?? null;
      return {
        recordId: record.recordId,
        type: record.type,
        recordedQuarter: group.gameQuarter.label,
        recordedAt: record.recordedAt,
        gameTeamId: record.gameTeamId,
        ...recordCopy({
          type: record.type,
          sportType,
          player: record.playerName,
          assist: record.scoreRecord?.assistPlayerName,
          score: record.scoreRecord?.score,
          cardType,
          pkSuccess,
          incoming: record.replacementRecord?.replacedPlayerName,
          foulOut: record.replacementRecord?.isFoulOut,
          progressTitle: progressTitle(record, group.gameQuarter.label),
        }),
        cardType,
        pkSuccess,
        playerName: record.playerName ?? null,
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

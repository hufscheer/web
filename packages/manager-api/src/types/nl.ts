import type { SportType } from './leagues';

export type NLMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ParseNLPayload = {
  history: NLMessage[];
  message: string;
};

export type ParseFailedLine = {
  index: number;
  name: string;
  studentNumber: string;
  jerseyNumber: number;
  reason: string;
};

export type ParseNLResponse = {
  displayMessage: string;
  preview: ParseNLPreview | null;
};

// UI 편집용 선수 타입 (jerseyNumber null 허용, error 포함)
export type PlayerData = {
  name: string;
  studentNumber: string;
  jerseyNumber: number | null;
  error?: string;
};

export type ParseNLPreview = {
  players: ParsedPlayer[];
  total: number;
  parseFailedLines: ParseFailedLine[];
};

export type ParsedPlayer = {
  name: string;
  studentNumber: string;
  jerseyNumber: number;
  // status?: 'NEW' | 'EXISTS';
  // existingPlayerId?: number | null;
  // error?: string;
};

export type RegisterNLResponse = {
  displayMessage: string;
  teamId: number;
  result: {
    created: number;
    assigned: number;
    skipped: number;
  };
};

export type RegisterNLPayload = {
  team: ParsedTeam;
  players: NLPlayerInput[];
};

export type ParsedTeam = {
  name: string;
  unit: string;
  teamColor: string;
  logoImageUrl: string;
  sportType: SportType;
};

export type CheckDuplicateNLResponse = {
  players: {
    name: string;
    studentNumber: string;
    jerseyNumber: number;
    status: 'NEW' | 'EXISTS';
    existingPlayerId: number | null;
  }[];
  summary: {
    total: number;
    newPlayers: number;
    existingPlayers: number;
    alreadyInTeam: number;
  };
};

export type NLPlayerStatus = 'NEW' | 'EXISTS' | 'ALREADY_IN_TEAM';

export type NLPlayerInput = {
  name: string;
  studentNumber: string;
  jerseyNumber: number | null;
};

export type NLSummary = {
  total: number;
  newPlayers: number;
  existingPlayers: number;
  alreadyInTeam: number;
};

export type ProcessNLPayload = {
  leagueId: number;
  teamId: number;
  message: string;
  history: NLMessage[];
};

export type ProcessNLResponse = {
  displayMessage: string;
  preview: {
    teamId: number;
    teamName: string;
    players: (NLPlayerInput & { status: NLPlayerStatus; existingPlayerId: number | null })[];
    summary: NLSummary;
    parseFailedLines: ParseFailedLine[];
  } | null;
};

export type ExecuteNLPayload = {
  leagueId: number;
  teamId: number;
  players: NLPlayerInput[];
};

export type ExecuteNLResponse = {
  displayMessage: string;
  result: {
    created: number;
    assigned: number;
    skipped: number;
  };
};

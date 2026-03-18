export type NLMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ProcessNLPayload = {
  history: NLMessage[];
  leagueId: number;
  teamId: number;
  message: string;
};

export type ParsedPlayer = {
  name: string;
  studentNumber: string;
  jerseyNumber: number;
  status?: 'NEW' | 'EXISTS';
  existingPlayerId?: number | null;
};

export type ProcessNLPreview = {
  type: 'REGISTER_PLAYERS_BULK';
  teamId: number;
  teamName: string;
  players: ParsedPlayer[];
  summary: {
    total: number;
    newPlayers: number;
    existingPlayers: number;
    alreadyInTeam: number;
  };
  parseFailedLines: string[];
};

export type ProcessNLResponse = {
  displayMessage: string;
  preview: ProcessNLPreview;
};

export type ExecuteNLResponse = {
  displayMessage: string;
  result: {
    created: number;
    assigned: number;
    skipped: number;
  };
};

export type ExecuteNLPayload = {
  teamId: number;
  players: ParsedPlayer[];
  leagueId: number;
};

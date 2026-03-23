export type NLMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type ParseNLPayload = {
  history: NLMessage[];
  message: string;
};

export type ParseNLResponse = {
  displayMessage: string;
  preview: ParseNLPreview | null;
  total: number;
  parseFailedLines: string[];
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
  players: ParsedPlayer[];
};

export type ParsedTeam = {
  name: string;
  unit: string;
  teamColor: string;
  logoImageUrl: string;
};

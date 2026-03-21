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
  preview: ParseNLPreview;
  total: number;
  parseFailedLines: string[];
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

export const TABS_CONFIG = {
  LINEUP: 'lineup',
  TIMELINE: 'timeline',
  HIGHLIGHT: 'highlight',
} as const;

export const GAME_STATE = {
  SCHEDULED: 'scheduled',
  PLAYING: 'playing',
  FINISHED: 'finished',
} as const;

export const GAME_STATE_KR = {
  scheduled: '예정',
  playing: '진행 중',
  finished: '종료',
} as const;

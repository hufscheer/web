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
  SCHEDULED: '예정',
  PLAYING: '진행 중',
  FINISHED: '종료',
} as const;

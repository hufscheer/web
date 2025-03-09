export const TABS_CONFIG = {
  LINEUP: 'lineup',
  TIMELINE: 'timeline',
  HIGHLIGHT: 'highlight',
} as const;

export const GAME_STATE = {
  SCHEDULED: 'SCHEDULED',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
} as const;

export const GAME_STATE_KR = {
  SCHEDULED: '예정',
  PLAYING: '진행 중',
  FINISHED: '종료',
} as const;

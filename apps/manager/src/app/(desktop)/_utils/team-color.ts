/** 경기 응답에 팀 색이 없어서 순서로 칠한다 */
export const TEAM_COLORS = ['#1f3a68', '#8b1f2f'] as const;

export const teamColorOf = (index: number) => TEAM_COLORS[index] ?? '#79828c';

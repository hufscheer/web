const DEFAULT_BORDER_COLOR = 'rgba(255, 255, 255, 0.5)';

const TEAM_COLOR_BORDER_MAP: Record<string, string> = {
  '#FF9A9E': '#B11D23', //rose
  '#FFA788': '#BF4F28', //coral
  '#FFB5AA': '#D6412B', //peach
  '#FFD479': '#C78B0C', //yellow
  '#8CBAFF': '#1A54AA', //blue
  '#7EECD8': '#17957E', //mint
  '#99A8CC': '#253C73', //slate
  '#B8C0CC': '#384E6F', //gray
};

export const getBorderColor = (teamColor?: string): string => {
  const lookup = teamColor ? TEAM_COLOR_BORDER_MAP[teamColor.toUpperCase().trim()] : undefined;
  return lookup || DEFAULT_BORDER_COLOR;
};

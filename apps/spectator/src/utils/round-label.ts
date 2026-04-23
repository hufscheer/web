export const getRoundLabel = (round: number) => {
  if (round > 16) return '예선';
  if (round === 2) return '결승';
  return `${round}강`;
};

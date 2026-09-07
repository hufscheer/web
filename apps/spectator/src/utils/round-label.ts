export const getRoundLabel = (round: number, thirdPlaceMatch = false) => {
  if (thirdPlaceMatch) return '3,4위전';
  if (round > 16) return '예선';
  if (round === 2) return '결승';
  if (round === 4) return '준결승';
  return `${round}강`;
};

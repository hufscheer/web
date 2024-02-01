import { MatchPlayerType } from '@/types/match';

import { lineupItem } from './LineupItem.css';

export default function LineupItem({
  playerName,
  description,
}: MatchPlayerType) {
  return (
    <li className={lineupItem.li}>
      <span className={lineupItem.description}>{description}</span>
      <span className={lineupItem.playerName}>{playerName}</span>
    </li>
  );
}

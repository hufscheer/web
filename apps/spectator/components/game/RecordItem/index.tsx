import { GameRecordsType } from '@/types/game';

import { recordItem } from './RecordItem.css';

export default function RecordItem({
  playerName,
  score,
  scoredAt,
  teamName,
}: GameRecordsType) {
  return (
    <li className={recordItem.li}>
      <time className={recordItem.time}>{scoredAt}</time>
      <span>[ {teamName} ] </span>
      <span>
        {playerName} 선수 {score}점 득점 🎉
      </span>
    </li>
  );
}

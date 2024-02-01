import { MatchRecordsType } from '@/types/match';

import { recordItem } from './RecordItem.css';

export default function RecordItem({
  playerName,
  score,
  scoredAt,
  teamName,
}: MatchRecordsType) {
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

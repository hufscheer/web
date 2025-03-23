import { SoccerIcon, SwitchIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import { useTimelineById } from '@/queries/useTimelineById';
import { GenericRecordType } from '@/types/game';

import * as styles from './Timeline.css';

type TimelineProps = {
  gameId: string;
};

export default function CheerTalkTimeline({ gameId }: TimelineProps) {
  const { data: timelines } = useTimelineById(gameId);

  if (timelines.length === 0) return null;

  const lastRecord = timelines[0].records[0];

  if (!lastRecord) return null;

  return (
    <div className={styles.wrapper}>
      {lastRecord.type === 'SCORE' && <Score {...lastRecord} />}
      {lastRecord.type === 'REPLACEMENT' && <Substitute {...lastRecord} />}
    </div>
  );
}

function Score({
  recordedAt,
  direction,
  teamImageUrl,
  teamName,
  scoreRecord,
  playerName,
}: GenericRecordType<'SCORE'>) {
  return (
    <div className={styles.scoreTimeline[direction]}>
      <div className={styles.timestamp}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SoccerIcon} size="sm" />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{playerName} 선수 GOAL!</span>
          <div className={styles.content.descriptionArea}>
            {scoreRecord?.snapshot[0].teamName}
            <span className={styles.content.scoreArea}>
              {`${scoreRecord?.snapshot[0].score} : ${scoreRecord?.snapshot[1].score}`}
            </span>
            {scoreRecord?.snapshot[1].teamName}
          </div>
        </div>
        <Image src={teamImageUrl} alt={`${teamName} 로고`} width={16} height={16} loading="lazy" />
      </div>
    </div>
  );
}

function Substitute({
  recordedAt,
  playerName,
  replacementRecord,
  teamImageUrl,
  teamName,
}: GenericRecordType<'REPLACEMENT'>) {
  return (
    <div className={styles.timeline}>
      <div className={styles.timestamp}>{recordedAt}′</div>
      <div className={styles.rightSide}>
        <Icon source={SwitchIcon} size="sm" />
        <div className={styles.content.wrapper}>
          <span className={styles.content.title}>{teamName} 선수 교체</span>
          <span className={styles.content.descriptionArea}>
            {playerName} out {replacementRecord?.replacedPlayerName} in
          </span>
        </div>
        <Image src={teamImageUrl} alt={`${teamName} 로고`} width={16} height={16} loading="lazy" />
      </div>
    </div>
  );
}

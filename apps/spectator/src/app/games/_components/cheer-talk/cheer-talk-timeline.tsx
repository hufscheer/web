import { SportsAndOutdoorsIcon, TradeIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { type TimelineRecordType, useSuspenseGameTimeline } from '~/api';
import { useSuspenseGameTeamInfo } from '~/app/games/_components/cheer-talk/useGameTeamInfo';

type Props = {
  gameId: number;
};

export const CheerTalkTimeline = ({ gameId }: Props) => {
  const { data: timelines } = useSuspenseGameTimeline({ gameId });
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  if (timelines.length === 0) return null;

  const lastRecord = timelines[0].records[0];
  if (!lastRecord) return null;
  if (lastRecord.type !== 'SCORE' && lastRecord.type !== 'REPLACEMENT') return null;

  const direction = getTeamInfo(lastRecord.gameTeamId).direction;

  return (
    <div className="w-full p-4">
      <div
        className={twMerge(
          'relative row-between h-11 w-full rounded-lg px-3 py-1',
          direction === 'HOME' ? 'bg-[#002843]' : 'bg-[#9C1714]',
        )}
      >
        {lastRecord.type === 'SCORE' && <Score {...lastRecord} />}
        {lastRecord.type === 'REPLACEMENT' && <Replacement {...lastRecord} />}
      </div>
    </div>
  );
};

const Score = ({ recordedAt, teamImageUrl, teamName, playerName }: TimelineRecordType) => {
  return (
    <Fragment>
      <Typography
        className="rounded-sm bg-white px-1 py-0.5"
        fontSize={12}
        weight="semibold"
        lineHeight="none"
      >
        {recordedAt}'
      </Typography>

      <div className="center-y absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2">
        <SportsAndOutdoorsIcon className="text-white" size={18} />
        <div className="column-center-x">
          <Typography color={colors.white} fontSize={12} weight="medium">
            {playerName} 선수 득점
          </Typography>
        </div>
        <Image
          className="overflow-hidden rounded-full object-cover"
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={18}
          height={18}
        />
      </div>
    </Fragment>
  );
};

const Replacement = ({
  recordedAt,
  playerName,
  teamImageUrl,
  teamName,
  replacementRecord,
}: TimelineRecordType) => {
  return (
    <Fragment>
      <Typography
        className="rounded-sm bg-white px-1 py-0.5"
        fontSize={12}
        weight="semibold"
        lineHeight="none"
      >
        {recordedAt}'
      </Typography>

      <div className="center-y absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2">
        <TradeIcon size={18} />
        <div className="column-center-x">
          <Typography color={colors.white} fontSize={12} weight="medium">
            {replacementRecord?.replacedPlayerName} 선수 투입
          </Typography>
          <Typography color={colors.white} fontSize={10} weight="medium">
            {playerName} 선수 교체
          </Typography>
        </div>
        <Image
          className="overflow-hidden rounded-full object-cover"
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={18}
          height={18}
        />
      </div>
    </Fragment>
  );
};

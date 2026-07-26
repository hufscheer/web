'use client';

import { SportsAndOutdoorsIcon, TradeIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { type TimelineRecordType, useSuspenseGameTimeline } from '~/api';
import { useSuspenseGameTeamInfo } from '~/app/org/[orgId]/_hooks/useGameTeamInfo';

type Props = {
  gameId: number;
};

type ScoreRecord = Extract<TimelineRecordType, { type: 'SCORE' }>;
type AnyReplacementRecord = Extract<TimelineRecordType, { type: 'SOCCER_REPLACEMENT' }>;

export const CheerTalkTimeline = ({ gameId }: Props) => {
  const { data } = useSuspenseGameTimeline({ gameId });
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  if (data.timelines.length === 0) return null;

  const lastRecord = data.timelines[0].records[0];
  if (!lastRecord) return null;

  const isScore = lastRecord.type === 'SCORE';
  const isReplacement = lastRecord.type === 'SOCCER_REPLACEMENT';

  if (!isScore && !isReplacement) return null;

  const direction = getTeamInfo(lastRecord.gameTeamId).direction;

  return (
    <div className="w-full p-4">
      <div
        className={twMerge(
          'relative row-between h-11 w-full rounded-lg px-3 py-1',
          direction === 'HOME' ? 'bg-[#002843]' : 'bg-[#9C1714]',
        )}
      >
        {lastRecord.type === 'SCORE' && <Score record={lastRecord} />}
        {lastRecord.type === 'SOCCER_REPLACEMENT' && <Replacement record={lastRecord} />}
      </div>
    </div>
  );
};

const Score = ({ record }: { record: ScoreRecord }) => {
  const { recordedAt, teamImageUrl, teamName, playerName } = record;

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
          className="overflow-hidden rounded-full object-contain"
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={18}
          height={18}
        />
      </div>
    </Fragment>
  );
};

const Replacement = ({ record }: { record: AnyReplacementRecord }) => {
  const { recordedAt, playerName, teamImageUrl, teamName, replacementRecord } = record;

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
            {replacementRecord.replacedPlayerName} 선수 투입
          </Typography>
          <Typography color={colors.white} fontSize={10} weight="medium">
            {playerName} 선수 교체
          </Typography>
        </div>
        <Image
          className="overflow-hidden rounded-full object-contain"
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={18}
          height={18}
        />
      </div>
    </Fragment>
  );
};

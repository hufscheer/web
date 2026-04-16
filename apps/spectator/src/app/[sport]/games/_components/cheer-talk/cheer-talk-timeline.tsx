'use client';

import { SportsAndOutdoorsIcon, TradeIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { type SportType, type TimelineRecordType, useSuspenseGameTimeline } from '~/api';
import { useSuspenseGameTeamInfo } from '~/app/[sport]/games/_components/cheer-talk/useGameTeamInfo';

type Props = {
  gameId: number;
  sportType: SportType;
};

type ScoreRecord = Extract<TimelineRecordType, { type: 'SCORE' }>;
type AnyReplacementRecord = Extract<
  TimelineRecordType,
  { type: 'REPLACEMENT' | 'BASKETBALL_REPLACEMENT' }
>;

export const CheerTalkTimeline = ({ gameId, sportType }: Props) => {
  const { data: timelines } = useSuspenseGameTimeline({ gameId });
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  if (timelines.length === 0) return null;

  const lastRecord = timelines[0].records[0];
  if (!lastRecord) return null;

  const isScore = lastRecord.type === 'SCORE';
  const isReplacement =
    lastRecord.type === 'REPLACEMENT' || lastRecord.type === 'BASKETBALL_REPLACEMENT';

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
        {lastRecord.type === 'SCORE' && <Score record={lastRecord} sportType={sportType} />}
        {(lastRecord.type === 'REPLACEMENT' || lastRecord.type === 'BASKETBALL_REPLACEMENT') && (
          <Replacement record={lastRecord} sportType={sportType} />
        )}
      </div>
    </div>
  );
};

const Score = ({ record, sportType }: { record: ScoreRecord; sportType: SportType }) => {
  const { recordedAt, teamImageUrl, teamName, playerName, scoreRecord } = record;

  if (sportType === 'BASKETBALL') {
    return (
      <div className="center-y absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-1.5">
        <span role="img" aria-label="농구공">
          🏀
        </span>
        <Typography color={colors.white} fontSize={12} weight="medium">
          {teamName} {playerName} {scoreRecord.score}점슛 성공!
        </Typography>
        <Image
          className="overflow-hidden rounded-full object-cover"
          src={teamImageUrl}
          alt={`${teamName} 로고`}
          width={18}
          height={18}
        />
      </div>
    );
  }

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
  record,
  sportType,
}: {
  record: AnyReplacementRecord;
  sportType: SportType;
}) => {
  const { recordedAt, playerName, teamImageUrl, teamName, replacementRecord } = record;

  const replacementLabel =
    sportType === 'BASKETBALL' && replacementRecord.isFoulOut ? '파울 아웃 교체' : '선수 교체';

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
            {playerName} {replacementLabel}
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

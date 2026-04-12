'use client';

import { SmsIcon } from '@hcc/icons';
import { Button, Typography } from '@hcc/ui';
import { startTransition } from 'react';

import type { SportType } from '~/api/types';

import { useSportType } from '~/hooks/useSportType';

const OTHER_SPORT: Record<SportType, { value: SportType; emoji: string }> = {
  SOCCER: { value: 'BASKETBALL', emoji: '🏀' },
  BASKETBALL: { value: 'SOCCER', emoji: '⚽' },
};

export const EmptyLeague = () => {
  const { sport, setSport } = useSportType();
  const other = OTHER_SPORT[sport];

  const handleClick = () => {
    startTransition(() => {
      setSport(other.value, { scroll: false, history: 'replace' });
    });
  };

  return (
    <div className="my-4 flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl bg-(--color-greyscale-50)">
      <div className="flex flex-col items-center gap-2">
        <SmsIcon color="var(--color-greyscale-300)" size={30} />
        <Typography
          className="text-center"
          color="var(--color-greyscale-300)"
          fontSize={16}
          weight="medium"
        >
          아직 등록된 리그가 없어요.
          <br />곧 재밌는 리그 중계로 찾아올게요!
        </Typography>
      </div>
      <Button color="primary" size="md" onClick={handleClick} className="gap-1">
        <span>{other.emoji}</span>
        다른 경기 보러 가기
      </Button>
    </div>
  );
};

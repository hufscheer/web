'use client';

import { SmsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { SportType } from '~/api/types';

import { EmptyState } from '~/components/ui';
import { replaceSportInPathname } from '~/utils/sport-route';

const OTHER_SPORT: Record<SportType, { value: SportType; emoji: string }> = {
  SOCCER: { value: 'BASKETBALL', emoji: '🏀' },
  BASKETBALL: { value: 'SOCCER', emoji: '⚽' },
};

export const EmptyLeague = ({ sport }: { sport: SportType }) => {
  const other = OTHER_SPORT[sport];
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const nextPath = replaceSportInPathname(pathname, other.value);
    const qs = searchParams.toString();
    router.replace(qs ? `${nextPath}?${qs}` : nextPath, { scroll: false });
  };

  return (
    <EmptyState
      icon={<SmsIcon color="var(--color-greyscale-300)" size={30} />}
      title="아직 등록된 리그가 없어요"
      description="곧 재밌는 리그 중계로 찾아올게요!"
      action={
        <Button color="primary" size="md" onClick={handleClick} className="gap-1">
          <span>{other.emoji}</span>
          다른 경기 보러 가기
        </Button>
      }
    />
  );
};

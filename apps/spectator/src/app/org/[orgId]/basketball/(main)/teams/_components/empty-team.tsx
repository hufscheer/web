'use client';

import { SmsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { EmptyState } from '~/components/ui';
import { replaceSportInPathname } from '~/utils/sport-route';

import { SPORT_TYPE } from '../../../_constants';

export const EmptyTeam = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const nextPath = replaceSportInPathname(pathname, SPORT_TYPE);
    const qs = searchParams.toString();
    router.replace(qs ? `${nextPath}?${qs}` : nextPath, { scroll: false });
  };

  return (
    <EmptyState
      icon={<SmsIcon color="var(--color-greyscale-300)" size={30} />}
      title="아직 등록된 팀이 없어요"
      description="곧 새로운 팀으로 찾아올게요!"
      action={
        <Button color="primary" size="md" onClick={handleClick} className="gap-1">
          <span>🏀</span>
          다른 팀 보러 가기
        </Button>
      }
    />
  );
};

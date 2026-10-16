import { GroupIcon, PersonIcon, RewardedAdsIcon, SmsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import Link from 'next/link';

import { routes } from '~/constants/routes';

export const BottomMenu = () => {
  return (
    <div className="w-full gap-2 border-t border-neutral-100 bg-white p-5">
      <div className="row-between mb-2 gap-2">
        <Button
          render={<Link href={`/${routes.leagues}`} />}
          variant="subtle"
          className="flex-1 gap-1"
        >
          <RewardedAdsIcon size={20} /> 대회 관리
        </Button>
        <Button
          render={<Link href={`/${routes.cheertalks}`} />}
          variant="subtle"
          className="flex-1 gap-1"
        >
          <SmsIcon size={20} /> 응원톡 관리
        </Button>
      </div>
      <div className="row-between gap-2">
        <Button
          render={<Link href={`/${routes.players}`} />}
          variant="subtle"
          className="flex-1 gap-1"
        >
          <PersonIcon size={20} /> 선수 관리
        </Button>
        <Button
          render={<Link href={`/${routes.teams}`} />}
          variant="subtle"
          className="flex-1 gap-1"
        >
          <GroupIcon size={20} /> 팀 관리
        </Button>
      </div>
    </div>
  );
};

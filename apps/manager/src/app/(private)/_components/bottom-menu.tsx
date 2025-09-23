import { GroupIcon, PersonIcon, RewardedAdsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import Link from 'next/link';
import { routes } from '~/constants/routes';
import { ChatFillIcon } from '../../../../../../packages/icons/src/components/semantic/ChatFillIcon';

export const BottomMenu = () => {
  return (
    <div className="w-full gap-2 border-neutral-100 border-t bg-white p-5">
      <div className="row-between mb-2 gap-2">
        <Button className="flex-1 gap-1" variant="subtle" asChild>
          <Link href={`/${routes.league}`}>
            <RewardedAdsIcon size={20} /> 대회 관리
          </Link>
        </Button>
        <Button className="flex-1 gap-1" variant="subtle" asChild>
          <Link href={`/${routes.cheertalk}`}>
            <ChatFillIcon size={20} /> 응원톡 관리
          </Link>
        </Button>
      </div>
      <div className="row-between gap-2">
        <Button className="flex-1 gap-1" variant="subtle" asChild>
          <Link href={`/${routes.player}`}>
            <PersonIcon size={20} /> 선수 관리
          </Link>
        </Button>
        <Button className="flex-1 gap-1" variant="subtle" asChild>
          <Link href={`/${routes.team}`}>
            <GroupIcon size={20} /> 팀 관리
          </Link>
        </Button>
      </div>
    </div>
  );
};

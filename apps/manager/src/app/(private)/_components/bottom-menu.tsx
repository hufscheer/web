import { GroupIcon, PersonIcon, RewardedAdsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import Link from 'next/link';
import { routes } from '~/constants/routes';

export const BottomMenu = () => {
  return (
    <div className="row-between w-full gap-2 border-neutral-100 border-t bg-white p-5">
      <Button className="flex-1 gap-1" variant="subtle" asChild>
        <Link href={`/${routes.leagues}`}>
          <RewardedAdsIcon size={20} /> 대회 관리
        </Link>
      </Button>
      <Button className="flex-1 gap-1" variant="subtle" asChild>
        <Link href={`/${routes.players}`}>
          <PersonIcon size={20} /> 선수 관리
        </Link>
      </Button>
      <Button className="flex-1 gap-1" variant="subtle" asChild>
        <Link href={`/${routes.teams}`}>
          <GroupIcon size={20} /> 팀 관리
        </Link>
      </Button>
    </div>
  );
};

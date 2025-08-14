import { GroupIcon, PersonIcon, RewardedAdsIcon } from '@hcc/icons';
import { Button } from '@hcc/ui';
import Link from 'next/link';
import { Header } from '~/components/layout';
import { ROUTES } from '~/constants/routes';

const Page = () => {
  return (
    <>
      <Header />
      <div className="column-between h-full">
        <div />

        <div className="row-between w-full gap-2 p-5">
          <Button className="flex-1 gap-1" variant="subtle" asChild>
            <Link href={ROUTES.HOME}>
              <RewardedAdsIcon size={20} />
              대회 관리
            </Link>
          </Button>
          <Button className="flex-1 gap-1" variant="subtle" asChild>
            <Link href={ROUTES.HOME}>
              <PersonIcon size={20} />
              선수 관리
            </Link>
          </Button>
          <Button className="flex-1 gap-1" variant="subtle" asChild>
            <Link href={ROUTES.HOME}>
              <GroupIcon size={20} />팀 관리
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;

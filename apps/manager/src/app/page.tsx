import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Typography } from '@hcc/ui';
import Link from 'next/link';

import { Header } from '~/components/layout';

import { BottomMenu } from './_components/bottom-menu';
import { LeagueCard } from './_components/league-card';

const LeagueMenu = () => (
  <Typography color="var(--color-primary-600)" weight="semibold" asChild>
    <Link href={''}>대회 관리</Link>
  </Typography>
);

const Page = () => {
  return (
    <>
      <Header menu={<LeagueMenu />} />

      <div className="column-between h-full">
        <div className="w-full flex-1 overflow-y-auto">
          <div className="row-between mt-1.5 w-full bg-white px-5 py-3">
            <div className="center-y gap-2">
              <Badge size="sm" variant="danger">
                진행 중
              </Badge>
              <Typography weight="semibold">트로이카 역동전 2024</Typography>
            </div>

            <Typography color="var(--color-neutral-500)" weight="medium" asChild>
              <Link className="center-y" href={''}>
                전체 경기 <ChevronForwardIcon size={24} />
              </Link>
            </Typography>
          </div>
          <LeagueCard />
        </div>
        <BottomMenu />
      </div>
    </>
  );
};

export default Page;

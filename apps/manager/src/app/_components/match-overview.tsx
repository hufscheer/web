import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Typography } from '@hcc/ui';
import Link from 'next/link';
import { LeagueCard } from './league-card';

export const MatchOverview = () => {
  return (
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
  );
};

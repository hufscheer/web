import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { Suspense } from '@suspensive/react';
import Image from 'next/image';
import Link from 'next/link';
import type { TeamType } from '~/api';
import { MatchHistory } from '~/app/(public)/_components/team-tab/match-history';
import { ScoreList } from '~/app/(public)/_components/team-tab/score-list';
import { routes } from '~/constants/routes';

type Props = {
  team: TeamType;
};

export const TeamCard = ({ team }: Props) => {
  return (
    <div className="column mb-5 gap-3 rounded-lg border border-gray-100 p-4">
      <div className="row-between gap-3">
        <div className="center-y gap-3">
          {team.logoImageUrl && (
            <div className="center relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200">
              <Image
                className="rounded-full object-cover"
                src={team.logoImageUrl}
                alt={`${team.name} 팀 로고`}
                width={28}
                height={28}
              />
            </div>
          )}
          <Typography weight="medium">{team.name}</Typography>
        </div>

        <Link href={`/${routes.team(team.id)}}`} className="center">
          <ChevronForwardIcon size={24} />
        </Link>
      </div>

      <hr className="h-px w-full border-none bg-neutral-100" />

      <div className="grid grid-cols-2 gap-5">
        <div>
          <Typography fontSize={14} weight="medium">
            🙋‍♂️ 득점왕
          </Typography>
          <Suspense clientOnly>
            <ScoreList teamId={team.id} />
          </Suspense>
        </div>
        <div>
          <Typography fontSize={14} weight="medium">
            💥 최근 경기
          </Typography>
          <Suspense clientOnly>
            <MatchHistory teamId={team.id} teamName={team.name} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

import { ChevronForwardIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import Image from 'next/image';
import Link from 'next/link';
import type { TeamType } from '~/api';
import { routes } from '~/constants/routes';
import { MatchHistory } from './match-history';
import { ScoreList } from './score-list';

type Props = {
  team: TeamType;
};

export const TeamCard = ({ team }: Props) => {
  return (
    <div className="column gap-3 rounded-lg border border-gray-100 p-4">
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
          <ErrorBoundary fallback={null}>
            <Suspense clientOnly>
              <ScoreList teamId={team.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div>
          <Typography fontSize={14} weight="medium">
            💥 최근 경기
          </Typography>
          <ErrorBoundary fallback={null}>
            <Suspense clientOnly>
              <MatchHistory teamId={team.id} teamName={team.name} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

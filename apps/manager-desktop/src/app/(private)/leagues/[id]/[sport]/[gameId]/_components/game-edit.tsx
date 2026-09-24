'use client';

import type { SportType } from '@hcc/manager-api';

import { useSuspenseQueries } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import Link from 'next/link';

import { NotFoundState } from '~/components/error-state';
import { PageHeader } from '~/components/layout/page-header';
import { Button } from '~/components/ui/button';
import { routes } from '~/constants/routes';
import { toGame } from '~/utils/convert';

import { GameEditForm } from './game-edit-form';

type Props = {
  leagueId: number;
  gameId: number;
  sportType: SportType;
};

export const GameEdit = ({ leagueId, gameId, sportType }: Props) => {
  const [{ data: detail }, { data: league }] = useSuspenseQueries({
    queries: [queryKeys.games.detail({ gameId }), queryKeys.leagues.detail({ leagueId })],
  });

  // 주소의 대회와 경기의 대회가 다르면 다른 대회의 라운드 설정으로 수정하게 된다
  if (detail.leagueId !== leagueId) return <NotFoundState />;

  const game = toGame(detail, sportType);

  return (
    <div className="flex flex-col">
      <PageHeader
        title={game.gameName || '경기 수정'}
        breadcrumb={['대회 관리', { label: game.leagueName, href: routes.league(game.leagueId) }]}
        actions={
          <Link href={routes.gameTimeline(game.leagueId, game.gameId, sportType)}>
            <Button size="md" color="black" variant="outline">
              경기 진행
            </Button>
          </Link>
        }
      />
      <div className="p-6">
        <GameEditForm
          game={game}
          quarter={detail.gameQuarter.key}
          maxRound={league.maxRound}
          thirdPlaceAvailable={league.thirdPlaceMatchEnabled}
        />
      </div>
    </div>
  );
};

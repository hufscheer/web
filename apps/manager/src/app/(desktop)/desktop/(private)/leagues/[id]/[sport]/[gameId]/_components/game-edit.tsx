'use client';

import { useSuspenseQueries } from '@hcc/api-base';
import Link from 'next/link';

import type { SportType } from '~/api';

import { queryKeys } from '~/api';
import { NotFoundState } from '~/desktop/components/error-state';
import { PageHeader } from '~/desktop/components/layout/page-header';
import { Button } from '~/desktop/components/ui/button';
import { routes } from '~/desktop/constants/routes';
import { toGame } from '~/desktop/utils/convert';

import { GameEditForm } from './game-edit-form';
import { LineupEditor } from './lineup-editor';

type Props = {
  leagueId: number;
  gameId: number;
  sportType: SportType;
};

export const GameEdit = ({ leagueId, gameId, sportType }: Props) => {
  const [{ data: detail }, { data: league }, { data: lineups }] = useSuspenseQueries({
    queries: [
      queryKeys.games.detail({ gameId }),
      queryKeys.leagues.detail({ leagueId }),
      queryKeys.games.lineup({ gameId }),
    ],
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
        <LineupEditor game={game} lineups={lineups} />
      </div>
    </div>
  );
};

'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Button, Typography } from '@hcc/ui';
import NumberFlow from '@number-flow/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import type { GameListType, LeagueCheerCountType } from '~/api';
import type { SportType } from '~/api/types';

import { useSuspenseLeagueCheerCount } from '~/api/queries/useLeagueCheerCount';
import { useSuspenseLeagueRecentGames } from '~/api/queries/useLeagueRecentGames';
import { GameCard } from '~/components/ui';
import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { useTracker } from '~/hooks/useTracker';

import { EmptyLeague } from '../../../../_components/empty-league';
import { SPORT_TYPE } from '../../../_constants';

export const RecentTab = () => {
  const sport: SportType = SPORT_TYPE;
  const { organizationId } = useOrganizationId();
  const { data: recentGames } = useSuspenseLeagueRecentGames({
    sportType: sport,
    organizationId,
  });

  const displayedGame = recentGames.find((league) => league.sportType === sport);

  if (!displayedGame) return <EmptyLeague sport={sport} />;

  return (
    <LeagueGameList
      leagueId={displayedGame.leagueId}
      leagueName={displayedGame.leagueName}
      games={displayedGame.games}
      sport={sport}
    />
  );
};

interface LeagueGameListProps {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
  sport: SportType;
}

const LeagueGameList = ({ leagueId, leagueName, games, sport }: LeagueGameListProps) => {
  const hasPlayingGames = !games.every(({ gameState }) => gameState === 'FINISHED');
  const buttonLabel = hasPlayingGames ? '응원하러 가기' : '지난 경기 보러가기';

  // gameState가 PLAYING인 경기, SCHEDULED인 경기, FINISHED인 경기 순으로 정렬
  // 각 경기 상태 내에서는 시작 시간이 느린 순으로 정렬
  const sortedGames = [...games].sort((a, b) => {
    const gameStateOrder = { PLAYING: 0, SCHEDULED: 1, FINISHED: 2 };
    const aOrder = gameStateOrder[a.gameState];
    const bOrder = gameStateOrder[b.gameState];

    if (aOrder !== bOrder) return aOrder - bOrder;
    if (a.gameState === 'SCHEDULED')
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  const { data: cheerCount } = useSuspenseLeagueCheerCount(
    { leagueId },
    { refetchInterval: hasPlayingGames ? 10000 : false },
  );

  return (
    <div className="flex flex-1 flex-col gap-3">
      <GameList
        cheerCount={cheerCount.cheerTalkCount}
        leagueId={leagueId}
        leagueName={leagueName}
        games={sortedGames}
        buttonLabel={buttonLabel}
        sport={sport}
      />
    </div>
  );
};

interface GameListProps {
  leagueId: number;
  leagueName: string;
  games: GameListType[];
  cheerCount: LeagueCheerCountType['cheerTalkCount'];
  buttonLabel: string;
  sport: SportType;
}

const GameList = ({
  leagueId,
  leagueName,
  games,
  cheerCount,
  buttonLabel,
  sport,
}: GameListProps) => {
  const sendEvent = useTracker({ category: 'Link_Game' });
  const router = useRouter();
  const { organizationId } = useOrganizationId();
  return (
    <>
      <GameCard.Divider />
      <Link
        href={routes.league({ orgId: organizationId, id: leagueId, sport })}
        className="row-between"
      >
        <div className="center-y gap-3">
          {/* <div className="center relative h-8 w-8 overflow-hidden rounded-full bg-neutral-200 select-none">
            ⚽
          </div> */}
          <Typography weight="medium">{leagueName}</Typography>
          <Badge variant="primary" size="sm">
            <NumberFlow format={{ notation: 'compact' }} value={cheerCount} />
            개의 응원톡 💬
          </Badge>
        </div>

        <ChevronForwardIcon size={24} />
      </Link>
      <GameCard.Divider />

      {games.map((game, index) => {
        if (game.gameTeams.length < 2) return null;
        const pathname = routes.game({ orgId: organizationId, id: game.id, sport });

        return (
          <Fragment key={game.id}>
            <GameCard game={game}>
              <GameCard.Container className="gap-4">
                <GameCard.Header />

                <div className="flex gap-4">
                  <Link href={pathname} className="column flex-1 gap-2">
                    <GameCard.Team index={1} />
                    <GameCard.Team index={2} />
                  </Link>

                  <div role="separator" className="w-px bg-gray-100" />

                  <GameCard.Actions
                    onBroadcastClick={() => router.push(pathname)}
                    onCheerClick={() => router.push(`${pathname}?cheer=1`)}
                  />
                </div>
              </GameCard.Container>
            </GameCard>
            {index !== games.length - 1 && <GameCard.Divider />}
            {index === 0 && (
              <Button
                render={<Link href={{ pathname, query: { tab: 'cheer' } }} />}
                variant="ghost"
                size="sm"
                color="primary"
                className="gap"
                onClick={() => sendEvent({ action: 'click', value: `${buttonLabel}_${game.id}` })}
              >
                {buttonLabel}
                <ChevronForwardIcon className="animate-[arrow_1s_ease-in-out_infinite] " />
              </Button>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

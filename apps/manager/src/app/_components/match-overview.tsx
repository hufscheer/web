'use client';

import { ChevronForwardIcon } from '@hcc/icons';
import { Badge, Typography } from '@hcc/ui';
import Link from 'next/link';
import { useSuspenseLeaguesHome } from '~/api';
import { ROUTES } from '~/constants/routes';
import { GameCard } from './game-card';

export const MatchOverview = () => {
  const { data } = useSuspenseLeaguesHome();

  return (
    <div className="column w-full flex-1 gap-1.5 overflow-y-auto pt-1.5">
      {data.map(league => (
        <div key={league.id}>
          <div className="row-between w-full bg-white px-5 py-3">
            <div className="center-y gap-2">
              <Badge size="sm" variant={league.state === '진행 중' ? 'danger' : 'default'}>
                {league.state}
              </Badge>
              <Typography weight="semibold">{league.name}</Typography>
            </div>
            <Typography color="var(--color-neutral-500)" weight="medium" asChild>
              <Link className="center-y" href={`${ROUTES.LEAGUE}/${league.id}`}>
                전체 경기 <ChevronForwardIcon size={24} />
              </Link>
            </Typography>
          </div>

          <hr className="h-[1px] w-full border-none bg-neutral-100" />

          {league.inProgressGames.map(game => (
            <GameCard key={game.id}>
              <GameCard.Header leagueId={league.id} {...game} />
              <GameCard.TeamGroup>
                {game.gameTeams.map(team => (
                  <GameCard.Team key={team.gameTeamId} {...team} />
                ))}
              </GameCard.TeamGroup>
              <GameCard.Menu />
            </GameCard>
          ))}

          {league.inProgressGames.length === 0 && (
            <Typography
              className="center w-full bg-white p-5"
              color="var(--color-neutral-500)"
              fontSize={14}
              weight="medium"
            >
              {league.state === '종료' ? '대회가 종료되었어요.' : '진행 중인 경기가 없어요.'}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';

import type { GameType } from '~/api';

import { routes } from '~/constants/routes';
import { useSportType } from '~/hooks/useSportType';

interface MatchHistoryProps {
  games: GameType[];
  teamName: string;
  limit?: number;
}

export const MatchHistory = ({ games, teamName, limit = 3 }: MatchHistoryProps) => {
  const { sport } = useSportType();

  return (
    <div className="column mt-2 gap-1.5">
      {games.slice(0, limit).map((game) => {
        if (game.gameTeams.length < 2) return null;

        const [home, away] =
          game.gameTeams[0].gameTeamName === teamName
            ? [game.gameTeams[0], game.gameTeams[1]]
            : [game.gameTeams[1], game.gameTeams[0]];

        return (
          <Link
            key={game.gameId}
            href={routes.game({ id: game.gameId, sport })}
            className="center-y gap-1.5 rounded-sm transition-colors duration-150 hover:bg-neutral-100"
          >
            <div className="center-y gap-0.5 overflow-hidden">
              <div className="h-5 w-5 rounded-full border border-neutral-200">
                <Image
                  className="rounded-full object-cover select-none"
                  src={home.logoImageUrl}
                  alt={`${home.gameTeamName} 팀 로고`}
                  width={20}
                  height={20}
                  draggable={false}
                />
              </div>

              <Typography
                className="min-w-9 text-center"
                color={
                  home.score > away.score
                    ? colors.primary600
                    : home.score < away.score
                      ? colors.danger600
                      : colors.neutral500
                }
                fontSize={13}
                weight="medium"
              >
                {home.score} : {away.score}
              </Typography>

              <div className="h-5 w-5 rounded-full border border-neutral-200">
                <Image
                  className="rounded-full object-cover select-none"
                  src={away.logoImageUrl}
                  alt={`${away.gameTeamName} 팀 로고`}
                  width={20}
                  height={20}
                  draggable={false}
                />
              </div>
            </div>

            <Typography
              className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
              color={colors.neutral500}
              fontSize={13}
              weight="medium"
            >
              {away.gameTeamName}
            </Typography>
          </Link>
        );
      })}

      {games.length === 0 && (
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          아직 경기 기록이 없어요.
        </Typography>
      )}
    </div>
  );
};

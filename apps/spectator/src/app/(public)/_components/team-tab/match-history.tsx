import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useSuspenseTeamGames } from '~/api';
import { routes } from '~/constants/routes';

type Props = {
  teamId: number;
  teamName: string;
};

export const MatchHistory = ({ teamId, teamName }: Props) => {
  const { data } = useSuspenseTeamGames({ id: teamId });

  return (
    <div className="column mt-1.5 gap-1">
      {data.slice(0, 3).map(game => {
        if (game.gameTeams.length < 2) return null;

        const [home, away] =
          game.gameTeams[0].gameTeamName === teamName
            ? [game.gameTeams[0], game.gameTeams[1]]
            : [game.gameTeams[1], game.gameTeams[0]];

        return (
          <Link
            key={game.gameId}
            href={`/${routes.game(game.gameId)}`}
            className="center-y gap-1.5 rounded-sm transition-colors duration-150 hover:bg-neutral-100"
          >
            <div className="center-y gap-0.5 overflow-hidden">
              <div className="h-5 w-5 rounded-full border border-neutral-200">
                <Image
                  className="select-none rounded-full object-cover"
                  src={home.logoImageUrl}
                  alt={`${home.gameTeamName} 팀 로고`}
                  width={20}
                  height={20}
                  draggable={false}
                />
              </div>

              <Typography
                className="min-w-9 text-center"
                color={colors.neutral500}
                fontSize={13}
                weight="medium"
              >
                {home.score} : {away.score}
              </Typography>

              <div className="h-5 w-5 rounded-full border border-neutral-200">
                <Image
                  className="select-none rounded-full object-cover"
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

      {data.length === 0 && (
        <Typography color={colors.neutral500} fontSize={13} weight="medium">
          아직 경기 기록이 없어요.
        </Typography>
      )}
    </div>
  );
};

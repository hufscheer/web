'use client';

import { Accordion, Typography } from '@hcc/ui';
import { twMerge } from 'tailwind-merge';
import { useSuspenseGame, useSuspenseGameLineup } from '~/api';

type Props = {
  gameId: number;
};

export const CandidateList = ({ gameId }: Props) => {
  const { data: game } = useSuspenseGame({ gameId });
  const { data: lineup } = useSuspenseGameLineup({ gameId });

  return (
    <Accordion type="single" collapsible>
      <Accordion.Item value="candidates">
        <Accordion.Trigger
          className={twMerge(
            '!justify-center !w-[calc(100%-40px)] mx-5 h-14 cursor-pointer gap-1 rounded-lg border border-neutral-100 transition-colors duration-150',
            'hover:bg-neutral-50',
          )}
        >
          <Typography fontSize={15} weight="semibold" asChild>
            <span>후보선수 보기</span>
          </Typography>
        </Accordion.Trigger>

        <Accordion.Content>
          <div className="grid grid-cols-[50%_1px_50%] pt-5">
            {game.gameTeams.map((team, index) => (
              <div
                key={team.gameTeamId}
                className={twMerge('column w-full gap-3 px-5', index === 0 ? 'order-1' : 'order-3')}
              >
                {lineup[index].candidatePlayers
                  .filter(player => !player.isReplaced)
                  .map(player => (
                    <div key={player.id} className="center-y w-full gap-2">
                      <span className="center h-7 w-7 rounded-lg bg-neutral-100 font-medium text-neutral-500 text-sm">
                        {player.jerseyNumber}
                      </span>
                      <Typography fontSize={14} weight="medium" lineHeight="none" asChild>
                        <span>{player.playerName}</span>
                      </Typography>
                    </div>
                  ))}
              </div>
            ))}

            <div className="order-2 h-full w-full bg-neutral-100" aria-hidden />
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

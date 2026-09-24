'use client';

import { useSuspensePlayer } from '@hcc/manager-api';

import { PageHeader } from '~/components/layout/page-header';
import { SPORT_LABEL } from '~/constants/sports';

import { PlayerForm } from '../../_components/player-form';
import { PlayerDeleteButton } from './player-delete-button';

export const PlayerDetail = ({ playerId }: { playerId: number }) => {
  const { data: player } = useSuspensePlayer({ id: playerId });
  const teams = player.teams ?? [];

  return (
    <div className="flex flex-col">
      <PageHeader
        title={player.name}
        breadcrumb={['선수 관리']}
        actions={<PlayerDeleteButton playerId={player.playerId} playerName={player.name} />}
      />

      <div className="flex max-w-5xl flex-wrap items-start gap-6 p-6">
        <div className="min-w-0 flex-1">
          <PlayerForm
            playerId={player.playerId}
            initialName={player.name}
            initialStudentNumber={player.studentNumber}
            teamNames={teams.map((team) => team.name)}
          />
        </div>

        <aside className="w-72 shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
          <h2 className="text-t6 flex h-11 items-center border-b border-[var(--color-greyscale-50)] px-4 font-semibold">
            기록
          </h2>
          <dl className="flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--color-greyscale-50)] px-5 py-3.5">
              <dt className="text-t6 text-[var(--color-neutral-500)]">총 득점</dt>
              <dd className="tnum text-t5 font-bold">{player.totalGoalCount ?? 0}</dd>
            </div>
            <div className="flex flex-col gap-2 px-5 py-3.5">
              <dt className="text-t6 text-[var(--color-neutral-500)]">소속 팀</dt>
              <dd className="flex flex-col gap-1.5">
                {teams.length === 0 ? (
                  <span className="text-t7 text-[var(--color-neutral-400)]">없음</span>
                ) : (
                  teams.map((team) => (
                    <span key={team.id} className="text-t6 flex items-center gap-2">
                      <span className="text-t7 text-[var(--color-neutral-400)]">
                        {SPORT_LABEL[team.sportType]}
                      </span>
                      {team.name}
                    </span>
                  ))
                )}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
};

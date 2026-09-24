'use client';

import type { LeagueTeamType } from '@hcc/manager-api';

import { useState } from 'react';

import type { SportType } from '~/types';

import { RosterAssistant } from '~/app/(private)/teams/_components/roster-assistant';
import { HCCBigLogo } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Toasts, useToasts } from '~/components/ui/toast';

/** 서버의 /nl/process·/nl/execute 는 그 팀이 이 대회 소속인지 확인한다. 그래서 참가 팀에서만 연다 */
export const RosterLauncher = ({
  leagueId,
  sportType,
  teams,
}: {
  leagueId: number;
  sportType: SportType;
  teams: LeagueTeamType[];
}) => {
  const [openFor, setOpenFor] = useState<LeagueTeamType | null>(null);
  const { toasts, push } = useToasts();

  if (teams.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]">
      <header className="flex items-center justify-between gap-3 border-b border-[var(--color-greyscale-50)] px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-t5 flex items-center gap-1.5 font-bold">
            <HCCBigLogo width={54} height={16} />
            명단으로 선수 등록
          </h2>
          <p className="text-t7 text-[var(--color-neutral-500)]">
            참가 팀에 선수를 한 번에 추가해요. 카톡·엑셀에서 복사한 명단을 그대로 붙여 넣으세요.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {teams.map((team) => (
          <div
            key={team.teamId}
            className="flex items-center gap-3 border-r border-b border-[var(--color-hairline)] px-5 py-3"
          >
            <span className="min-w-0 flex-1">
              <span className="text-t6 block truncate font-medium">{team.teamName}</span>
              <span className="text-t7 block text-[var(--color-neutral-400)]">
                선수 {team.sizeOfTeamPlayers ?? 0}명
              </span>
            </span>
            <Button
              type="button"
              size="sm"
              color="black"
              variant="outline"
              onClick={() => setOpenFor(team)}
            >
              명단 붙여넣기
            </Button>
          </div>
        ))}
      </div>

      {openFor && (
        <RosterAssistant
          target={{
            kind: 'existing-team',
            leagueId,
            teamId: openFor.teamId,
            teamName: openFor.teamName,
            sportType,
          }}
          onClose={() => setOpenFor(null)}
          onDone={push}
        />
      )}

      <Toasts items={toasts} />
    </section>
  );
};

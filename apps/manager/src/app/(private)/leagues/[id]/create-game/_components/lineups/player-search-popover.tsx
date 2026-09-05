'use client';

import { SearchIcon } from '@hcc/icons';
import { TextField } from '@hcc/ui';
import { PopoverPrimitives } from '@hcc/ui/primitives';
import { useId, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { SportType } from '~/api';

import type { LineupState, PlayerSelectionState } from './use-lineup-selection';
import type { TeamPlayer } from './use-lineups';

import { PositionSheet } from './position-sheet';

type Props = {
  players: TeamPlayer[];
  selection: PlayerSelectionState[];
  sportType: SportType;
  onToggleState: (playerId: number, state: LineupState) => void;
  onSetPosition: (playerId: number, position: string | null) => void;
};

export const PlayerSearchPopover = ({
  players,
  selection,
  sportType,
  onToggleState,
  onSetPosition,
}: Props) => {
  const searchInputId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => filterPlayers(players, query), [players, query]);

  const handleOpenChange = (next: boolean, details: PopoverPrimitives.Root.ChangeEventDetails) => {
    if (next) {
      setOpen(true);
      return;
    }

    if (details.reason === 'outside-press' || details.reason === 'escape-key') {
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div>
      <PopoverPrimitives.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverPrimitives.Trigger
          render={<div />}
          nativeButton={false}
          aria-label="선수 검색 열기"
          className="w-full focus-visible:outline-none"
        >
          <TextField
            inputId={searchInputId}
            label=""
            size="md"
            placeholder="선수 이름을 검색하세요"
            value={query}
            onValueChange={setQuery}
            right={<SearchIcon size="24" />}
            autoComplete="off"
          />
        </PopoverPrimitives.Trigger>

        <PopoverPrimitives.Portal>
          <PopoverPrimitives.Positioner side="bottom" align="start" sideOffset={4}>
            <PopoverPrimitives.Popup
              aria-label="선수 검색"
              className="!w-[var(--anchor-width)] !p-0 !text-neutral-900"
              initialFocus={() => document.getElementById(searchInputId)}
            >
              <div className="max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="p-4 text-center text-sm text-neutral-500">일치하는 선수가 없어요</p>
                ) : (
                  <ul className="divide-y divide-neutral-100">
                    {filtered.map((player) => {
                      const state = selection.find((s) => s.teamPlayerId === player.teamPlayerId);
                      return (
                        <SearchResultRow
                          key={player.teamPlayerId}
                          player={player}
                          state={state}
                          sportType={sportType}
                          onToggleState={(target) => onToggleState(player.teamPlayerId, target)}
                          onSetPosition={(position) => onSetPosition(player.teamPlayerId, position)}
                        />
                      );
                    })}
                  </ul>
                )}
              </div>
            </PopoverPrimitives.Popup>
          </PopoverPrimitives.Positioner>
        </PopoverPrimitives.Portal>
      </PopoverPrimitives.Root>
    </div>
  );
};

type SearchResultRowProps = {
  player: TeamPlayer;
  state: PlayerSelectionState | undefined;
  sportType: SportType;
  onToggleState: (target: LineupState) => void;
  onSetPosition: (position: string | null) => void;
};

const SearchResultRow = ({
  player,
  state,
  sportType,
  onToggleState,
  onSetPosition,
}: SearchResultRowProps) => {
  const canSelectPosition = state?.state === 'STARTER';

  return (
    <li className="flex items-center justify-between gap-2 px-3 py-2">
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-neutral-900">{player.name}</span>
        <span className="text-xs text-neutral-500">{player.studentNumber}</span>
      </div>
      <div className="flex items-center gap-1">
        <StateChip
          label="선발"
          active={state?.state === 'STARTER'}
          onClick={() => onToggleState('STARTER')}
        />
        <StateChip
          label="후보"
          active={state?.state === 'CANDIDATE'}
          onClick={() => onToggleState('CANDIDATE')}
        />
        <PositionSheet
          disabled={!canSelectPosition}
          sportType={sportType}
          value={state?.position ?? null}
          onSelect={onSetPosition}
        />
        {/* <PositionSelect
          disabled={!canSelectPosition}
          sportType={sportType}
          value={state?.position ?? null}
          onSelect={onSetPosition}
        /> */}
      </div>
    </li>
  );
};

type StateChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const StateChip = ({ label, active, onClick }: StateChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={twMerge(
      'rounded-md px-2 py-1 text-xs font-medium transition-colors',
      active ? 'bg-blue-500 text-white' : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200',
    )}
  >
    {label}
  </button>
);

const filterPlayers = (players: TeamPlayer[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return players;

  return players.filter(
    (p) => p.name.toLowerCase().includes(q) || p.jerseyNumber?.toString().includes(q),
  );
};

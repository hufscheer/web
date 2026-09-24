'use client';

import { useQuery } from '@hcc/api-base';
import { queryKeys } from '@hcc/manager-api';
import { useState } from 'react';

import { TextInput } from '~/components/ui/field';
import { useDebounce } from '~/hooks/useDebounce';

export type PickedPlayer = { playerId: number; name: string; studentNumber: string };

type Props = {
  excludeIds: number[];
  onPick: (player: PickedPlayer) => void;
};

const searchOf = (keyword: string) =>
  /^\d+$/.test(keyword) ? { studentNumber: keyword, size: 20 } : { name: keyword, size: 20 };

export const PlayerPicker = ({ excludeIds, onPick }: Props) => {
  const [query, setQuery] = useState('');
  const keyword = useDebounce(query).trim();
  const { data, isFetching } = useQuery({
    ...queryKeys.players.search(searchOf(keyword)),
    enabled: keyword !== '',
  });

  const loading = keyword === '' || isFetching;
  const visible = (loading ? [] : (data?.content ?? [])).filter(
    (p) => !excludeIds.includes(p.playerId),
  );

  return (
    <div className="flex flex-col gap-2">
      <TextInput
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="선수 이름 또는 학번으로 검색"
      />

      {query.trim() && (
        <div className="max-h-56 overflow-y-auto rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)]">
          {loading && visible.length === 0 ? (
            <p className="text-t7 px-3.5 py-3 text-[var(--color-neutral-400)]">검색 중…</p>
          ) : visible.length === 0 ? (
            <p className="text-t7 px-3.5 py-3 text-[var(--color-neutral-400)]">
              검색 결과가 없어요.
            </p>
          ) : (
            visible.map((player) => (
              <button
                key={player.playerId}
                type="button"
                onClick={() => {
                  onPick({
                    playerId: player.playerId,
                    name: player.name,
                    studentNumber: player.studentNumber,
                  });
                  setQuery('');
                }}
                className="flex w-full items-center justify-between gap-3 border-b border-[var(--color-hairline)] px-3.5 py-2.5 text-left last:border-b-0 hover:bg-[var(--color-neutral-50)]"
              >
                <span className="text-t6 font-medium">{player.name}</span>
                <span className="tnum text-t7 text-[var(--color-neutral-400)]">
                  {player.studentNumber}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

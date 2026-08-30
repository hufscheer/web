import { CheckSmallIcon } from '@hcc/icons';
import { colors, Modal, Typography } from '@hcc/ui';
import { Fragment, type ReactNode, Suspense, useCallback, useState } from 'react';

import type { PlayerType } from '~/api';

import { useSuspenseInfinitePlayers } from '~/api';
import { Skeleton } from '~/components/ui';
import { useDebounce, useIntersectionObserver } from '~/hooks';

export type SelectedPlayer = Pick<PlayerType, 'playerId' | 'name' | 'studentNumber'>;

type Props = {
  children: ReactNode;
  onPlayerClick: (player: SelectedPlayer) => void;
  selectedPlayerIds?: number[];
};

export const PlayerAppendDialog = ({ children, onPlayerClick, selectedPlayerIds = [] }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 300);

  const handlePlayerClick = (player: SelectedPlayer) => {
    onPlayerClick(player);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery('');
  };

  return (
    <Modal open={open} onOpenChange={handleOpenChange}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content
        className="flex h-[min(60vh,420px)] max-h-[70vh] min-h-0 w-full max-w-[var(--app-max-width)] flex-col overflow-hidden rounded-lg bg-white"
        aria-describedby={undefined}
      >
        <Modal.Title className="sr-only">참가 선수 선택</Modal.Title>

        <div className="border-b border-neutral-100">
          <Typography asChild>
            <input
              className="w-full px-4 py-4 outline-none"
              placeholder="선수 이름을 검색하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
            />
          </Typography>
        </div>

        <Suspense fallback={<PlayerListSkeleton />}>
          <PlayerList
            name={debouncedQuery.trim()}
            onPlayerClick={handlePlayerClick}
            selectedPlayerIds={selectedPlayerIds}
          />
        </Suspense>
      </Modal.Content>
    </Modal>
  );
};

const PlayerListSkeleton = () => (
  <div className="column gap-1.5 px-4 py-2">
    {['a', 'b', 'c', 'd', 'e'].map((key, i) => (
      <Fragment key={key}>
        <div className="column gap-1 py-0.5">
          <Skeleton className="h-4 w-2/5 p-0" />
          <Skeleton className="h-3 w-1/4 p-0" />
        </div>
        {i < 4 && <hr className="border-neutral-100" />}
      </Fragment>
    ))}
  </div>
);

interface PlayerListProps {
  name: string;
  onPlayerClick: (player: SelectedPlayer) => void;
  selectedPlayerIds: number[];
}

const PlayerList = ({ name, onPlayerClick, selectedPlayerIds }: PlayerListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfinitePlayers({
    cursor: 0,
    size: 20,
    name,
    studentNumber: '',
  });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref: sentinelRef } = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0.1,
  });

  return (
    <div className="column min-h-0 flex-1 gap-1.5 overflow-y-auto px-4 py-2">
      {data.map((player, index) => (
        <Fragment key={player.playerId}>
          <button
            type="button"
            className="center-y w-full flex-row justify-between gap-3 py-2 text-left"
            onClick={() => onPlayerClick(player)}
          >
            <span className="column min-w-0">
              <Typography weight="medium" asChild>
                <span>{player.name}</span>
              </Typography>
              <Typography fontSize={13} color={colors.neutral500} weight="medium" asChild>
                <span>{player.studentNumber}</span>
              </Typography>
            </span>
            <span
              aria-hidden="true"
              className={`center h-6 w-6 shrink-0 rounded-md border text-sm transition-colors ${
                selectedPlayerIds.includes(player.playerId)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-neutral-300 bg-white text-transparent'
              }`}
            >
              <CheckSmallIcon width={16} height={14} color="var(--color-white)" />
            </span>
          </button>

          {data.length - 1 !== index && <hr className="border-neutral-100" />}
        </Fragment>
      ))}

      <div ref={sentinelRef}>
        {isFetchingNextPage && (
          <>
            <hr className="border-neutral-100" />
            <div className="column gap-1 py-0.5">
              <Skeleton className="h-4 w-2/5 p-0" />
              <Skeleton className="h-3 w-1/4 p-0" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

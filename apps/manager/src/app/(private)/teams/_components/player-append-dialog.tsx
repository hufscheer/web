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
};

export const PlayerAppendDialog = ({ children, onPlayerClick }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, 300);

  const handlePlayerClick = (player: SelectedPlayer) => {
    setQuery('');
    setOpen(false);
    onPlayerClick(player);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content
        className="max-h-[70vh] w-full max-w-[var(--app-max-width)] overflow-hidden rounded-lg bg-white"
        aria-describedby={undefined}
      >
        <Modal.Title className="sr-only">참가 선수 선택</Modal.Title>

        <Typography asChild>
          <input
            className="w-full border border-neutral-100 px-3 py-3"
            placeholder="선수 이름을 검색하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />
        </Typography>

        <Suspense fallback={<PlayerListSkeleton />}>
          <PlayerList name={debouncedQuery.trim()} onPlayerClick={handlePlayerClick} />
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
}

const PlayerList = ({ name, onPlayerClick }: PlayerListProps) => {
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
    <div className="column gap-1.5 overflow-y-auto px-4 py-2">
      {data.map((player, index) => (
        <Fragment key={player.playerId}>
          <button
            type="button"
            className="column cursor-pointer"
            onClick={() => onPlayerClick(player)}
          >
            <Typography className="text-left" weight="medium" asChild>
              <span>{player.name}</span>
            </Typography>
            <Typography
              className="text-left"
              fontSize={13}
              color={colors.neutral500}
              weight="medium"
              asChild
            >
              <span>{player.studentNumber}</span>
            </Typography>
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

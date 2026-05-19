import { colors, Modal, Spinner, Typography } from '@hcc/ui';
import { Fragment, type ReactNode, Suspense, useCallback, useState } from 'react';

import type { PlayerType } from '~/api';

import { useSuspenseInfinitePlayers } from '~/api';
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

        <Suspense
          fallback={
            <div className="flex justify-center py-6">
              <Spinner size="sm" color="neutral" />
            </div>
          }
        >
          <PlayerList name={debouncedQuery || undefined} onPlayerClick={handlePlayerClick} />
        </Suspense>
      </Modal.Content>
    </Modal>
  );
};

interface PlayerListProps {
  name: string | undefined;
  onPlayerClick: (player: SelectedPlayer) => void;
}

const PlayerList = ({ name, onPlayerClick }: PlayerListProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfinitePlayers({
    name,
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

      {(hasNextPage || isFetchingNextPage) && (
        <div ref={sentinelRef} className="flex justify-center py-2">
          {isFetchingNextPage && <Spinner size="sm" color="neutral" />}
        </div>
      )}
    </div>
  );
};

import { colors, Modal, Spinner, Typography } from '@hcc/ui';
import { Fragment, type ReactNode, useCallback, useState } from 'react';

import { useSuspenseInfinitePlayers } from '~/api';
import { useIntersectionObserver } from '~/hooks';

type Props = {
  children: ReactNode;
  onPlayerClick: (id: number) => void;
};

export const PlayerAppendDialog = ({ children, onPlayerClick }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfinitePlayers();

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { ref: sentinelRef } = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0.1,
  });

  const handlePlayerClick = (id: number) => {
    setQuery('');
    setOpen(false);
    onPlayerClick(id);
  };

  const filteredPlayers = query ? data.filter((player) => player.name.includes(query)) : data;

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

        <div className="column gap-1.5 overflow-y-auto px-4 py-2">
          {filteredPlayers.map((player, index) => (
            <Fragment key={player.playerId}>
              <button
                type="button"
                className="column cursor-pointer"
                onClick={() => handlePlayerClick(player.playerId)}
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

              {filteredPlayers.length - 1 !== index && <hr className="border-neutral-100" />}
            </Fragment>
          ))}

          {(hasNextPage || isFetchingNextPage) && (
            <div ref={sentinelRef} className="flex justify-center py-2">
              {isFetchingNextPage && <Spinner size="sm" color="neutral" />}
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

'use client';

import { ChatFillIcon } from '@hcc/icons';
import { BottomSheet, colors, Typography } from '@hcc/ui';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CheerTalkType, GameCheerTalkWithTeamInfo } from '~/api';
import useSocket from '~/hooks/useSocket';
import { CheerTalkList } from './cheer-talk-list';
import { CheerTalkTimeline } from './cheer-talk-timeline';
import useCheerTalkById from './useCheerTalkById';
import { useSuspenseGameTeamInfo } from './useGameTeamInfo';

type Props = {
  gameId: number;
};

export const CheerTalk = ({ gameId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [socketTalkList, setSocketTalkList] = useState<GameCheerTalkWithTeamInfo[]>([]);
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  const { data: cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const cheerTalks = useMemo(
    () => (cheerTalkList ? cheerTalkList.pages.flat() : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: CheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList(prev => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get('cheer')) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      if (!open && searchParams.get('cheer')) {
        const sp = new URLSearchParams(Array.from(searchParams.entries()));
        sp.delete('cheer');
        const search = sp.toString();
        router.replace(search ? `${pathname}?${search}` : pathname);
      }
    },
    [searchParams, router, pathname],
  );

  return (
    <div className="column gap-2 border-neutral-100 border-t p-4">
      <div className="flex flex-row justify-between gap-2">
        <div>
          <BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
            <Typography color={colors.neutral900} weight="semibold">
              실시간 응원톡
            </Typography>

            <BottomSheet.Trigger className="cursor-pointer">
              <div className="row-between gap-2">
                <Typography
                  fontSize={14}
                  weight="medium"
                  // className="rounded-full bg-neutral-100 px-3 py-2"
                >
                  응원톡에 들어가 여러분의 팀을 응원해보세요! 🙌
                </Typography>
              </div>
            </BottomSheet.Trigger>
            <BottomSheet.Portal>
              <BottomSheet.Content className="!h-full max-h-[90%]">
                <BottomSheet.Title className="sr-only">응원톡 작성</BottomSheet.Title>
                <div className="column-between h-full overflow-hidden">
                  <CheerTalkTimeline gameId={gameId} />
                  <CheerTalkList
                    gameId={gameId}
                    cheerTalkList={cheerTalks}
                    socketTalkList={socketTalkList}
                    {...rest}
                  />
                </div>
              </BottomSheet.Content>
            </BottomSheet.Portal>
          </BottomSheet>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="center flex-row gap-1 rounded-full bg-[var(--color-primary-600)] p-3 text-white transition-opacity hover:opacity-90"
        >
          <ChatFillIcon className="text-white" />
          입장하기
        </button>
      </div>
    </div>
  );
};

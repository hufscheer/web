'use client';

import { ChatFillIcon } from '@hcc/icons';
import { BottomSheet, colors, Typography } from '@hcc/ui';
import { useMemo, useState } from 'react';
import type { CheerTalkType, GameCheerTalkWithTeamInfo } from '~/api';
import useSocket from '~/hooks/useSocket';
import { CheerTalkList } from './cheer-talk-list';
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
    () => (cheerTalkList ? cheerTalkList.pages.flatMap(talk => talk) : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: CheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList(prev => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  const { connect } = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || '',
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  connect();

  return (
    <div className="column gap-2 border-neutral-100 border-t p-4">
      <Typography color={colors.neutral900} weight="semibold">
        실시간 응원톡
      </Typography>

      <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
        <BottomSheet.Trigger className="cursor-pointer">
          <div className="center gap-2">
            <div className="center size-8 rounded-full bg-[var(--color-primary-600)]">
              <ChatFillIcon className="text-white" />
            </div>
            <Typography
              fontSize={13}
              weight="medium"
              className="rounded-full bg-neutral-100 px-3 py-2"
            >
              응원톡에 들어가 여러분의 팀을 응원해보세요! 🙌
            </Typography>
          </div>
        </BottomSheet.Trigger>
        <BottomSheet.Portal>
          <BottomSheet.Content className="!h-full max-h-[90%]">
            <BottomSheet.Title className="sr-only">응원톡 작성</BottomSheet.Title>
            <div className="column-between h-full overflow-hidden">
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
  );
};

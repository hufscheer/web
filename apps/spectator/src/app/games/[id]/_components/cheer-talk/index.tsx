"use client";

import { ChatFillIcon } from "@hcc/icons";
import { BottomSheet, colors, Typography } from "@hcc/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, useCallback } from "react";

import type { CheerTalkType, GameCheerTalkWithTeamInfo } from "~/api";

import useSocket from "~/hooks/useSocket";

import { CheerTalkList } from "./cheer-talk-list";
import { CheerTalkTimeline } from "./cheer-talk-timeline";
import useCheerTalkById from "./useCheerTalkById";
import { useSuspenseGameTeamInfo } from "./useGameTeamInfo";

type Props = {
  gameId: number;
};

export const CheerTalk = ({ gameId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [socketTalkList, setSocketTalkList] = useState<
    GameCheerTalkWithTeamInfo[]
  >([]);
  const { getTeamInfo } = useSuspenseGameTeamInfo(gameId);

  const { data: cheerTalkList, ...rest } = useCheerTalkById(gameId);
  const cheerTalks = useMemo(
    () => (cheerTalkList ? cheerTalkList.pages.flat() : []),
    [cheerTalkList],
  );

  const handleSocketMessage = (cheerTalk: CheerTalkType) => {
    if (cheerTalk) {
      const teamInfo = getTeamInfo(cheerTalk.gameTeamId);
      setSocketTalkList((prev) => [...prev, { ...cheerTalk, ...teamInfo }]);
    }
  };

  useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || "",
    destination: `/topic/games/${gameId}`,
    callback: handleSocketMessage,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("cheer")) {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      if (!open && searchParams.get("cheer")) {
        const sp = new URLSearchParams(Array.from(searchParams.entries()));
        sp.delete("cheer");
        const search = sp.toString();
        router.replace(search ? `${pathname}?${search}` : pathname);
      }
    },
    [searchParams, router, pathname],
  );

  return (
    <div className="column gap-2 border-t border-neutral-100 p-4">
      <BottomSheet open={isOpen} onOpenChange={handleOpenChange}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Typography
              color={colors.neutral900}
              weight="semibold"
              className="text-xl sm:text-2xl"
            >
              실시간 응원톡
            </Typography>
            <Typography
              fontSize={12}
              weight="medium"
              className="break-keep text-sm leading-relaxed sm:text-base"
            >
              응원톡에 들어가 여러분의 팀을 응원해보세요! 🙌
            </Typography>
          </div>
          <BottomSheet.Trigger className="mt-2 block cursor-pointer text-left">
            <button
              type="button"
              className="
                  center shrink-0 whitespace-nowrap rounded-full bg-[var(--color-primary-600)] text-white transition-opacity hover:opacity-90 my-1 flex flex-row items-center gap-1 px-3 py-2 text-sm font-bold
                  sm:px-3.5 sm:py-2
                "
            >
              <ChatFillIcon className="shrink-0 text-white" />
              <span className="whitespace-nowrap">입장하기</span>
            </button>
          </BottomSheet.Trigger>
        </div>

        <BottomSheet.Portal>
          <BottomSheet.Content className="!h-full max-h-[90%]">
            <BottomSheet.Title className="sr-only">
              응원톡 작성
            </BottomSheet.Title>
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
  );
};

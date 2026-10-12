import { useCallback, useEffect, useRef, useState } from 'react';

import type { GameCheerTalkWithTeamInfo } from '~/api';

type Params = {
  socketTalkList: GameCheerTalkWithTeamInfo[];
  isNearBottom: () => boolean;
  scrollToBottom: () => void;
};

export const useNewMessageNotifier = ({ socketTalkList, isNearBottom, scrollToBottom }: Params) => {
  const [preview, setPreview] = useState<GameCheerTalkWithTeamInfo | null>(null);
  const lastSeenIdRef = useRef<number | null>(null);
  const followNextRef = useRef(false);

  useEffect(() => {
    if (socketTalkList.length === 0) return;
    const last = socketTalkList[socketTalkList.length - 1];
    if (lastSeenIdRef.current === last.cheerTalkId) return;
    lastSeenIdRef.current = last.cheerTalkId;

    if (followNextRef.current || isNearBottom()) {
      followNextRef.current = false;
      scrollToBottom();
      setPreview(null);
    } else {
      setPreview(last);
    }
  }, [socketTalkList, isNearBottom, scrollToBottom]);

  const dismiss = useCallback(() => {
    setPreview(null);
    scrollToBottom();
  }, [scrollToBottom]);

  const clearIfNearBottom = useCallback(() => {
    if (preview && isNearBottom()) setPreview(null);
  }, [preview, isNearBottom]);

  // 내가 보낸 메시지는 소켓으로 돌아오므로, 그때 스크롤 위치와 관계없이 하단으로 따라간다.
  const followNextMessage = useCallback(() => {
    followNextRef.current = true;
    scrollToBottom();
  }, [scrollToBottom]);

  return { preview, dismiss, clearIfNearBottom, followNextMessage };
};

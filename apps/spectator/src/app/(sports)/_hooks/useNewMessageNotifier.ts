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

  useEffect(() => {
    if (socketTalkList.length === 0) return;
    const last = socketTalkList[socketTalkList.length - 1];
    if (lastSeenIdRef.current === last.cheerTalkId) return;
    lastSeenIdRef.current = last.cheerTalkId;

    if (isNearBottom()) {
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

  return { preview, dismiss, clearIfNearBottom };
};

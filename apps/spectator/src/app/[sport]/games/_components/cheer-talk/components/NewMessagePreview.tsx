import { colors, Typography } from '@hcc/ui';

import type { GameCheerTalkWithTeamInfo } from '~/api';

type Props = {
  message: GameCheerTalkWithTeamInfo;
  onClick: () => void;
};

const BLOCKED_MESSAGE_TEXT = '관리자에 의해 차단된 톡입니다';

export const NewMessagePreview = ({ message, onClick }: Props) => {
  const body = message.isBlocked ? BLOCKED_MESSAGE_TEXT : message.content;

  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-in fade-in slide-in-from-bottom-2 flex w-full cursor-pointer items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 text-left shadow-lg"
      aria-label="새 메시지로 이동"
    >
      <Typography fontSize={12} color={colors.neutral500} className="shrink-0">
        새 메시지
      </Typography>
      <Typography fontSize={13} color={colors.neutral800} className="flex-1 truncate" asChild>
        <span>{body}</span>
      </Typography>
      <Typography fontSize={12} color={colors.primary500} className="shrink-0" asChild>
        <span>↓</span>
      </Typography>
    </button>
  );
};

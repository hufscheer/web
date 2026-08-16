import { CloseIcon } from '@hcc/icons';
import { colors, Typography } from '@hcc/ui';

type Props = {
  onDismiss: () => void;
};

export const NoticeBanner = ({ onDismiss }: Props) => (
  <div className="animate-in fade-in slide-in-from-bottom-2 flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 shadow-lg">
    <Typography fontSize={12} color={colors.neutral700} className="leading-5">
      타인에게 불쾌감을 주거나 법령을 위반하는 활동을 할 경우, 운영정책에 따라 메시지 삭제 및 서비스
      이용이 제한 될 수 있습니다.
    </Typography>
    <button
      type="button"
      onPointerDown={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onDismiss}
      className="text-neutral-400 hover:text-neutral-600"
      aria-label="안내 닫기"
    >
      <CloseIcon size={16} />
    </button>
  </div>
);

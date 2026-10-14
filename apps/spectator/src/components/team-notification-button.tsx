'use client';

import { NotificationsFillIcon, NotificationsIcon } from '@hcc/icons';
import { Modal, toast } from '@hcc/ui';
import { useState } from 'react';

import { useTeamNotification } from '~/hooks/useTeamNotification';
import { cn } from '~/utils/cn';

type Props = {
  teamId: number;
  size?: number;
  className?: string;
};

export const TeamNotificationButton = ({ teamId, size = 24, className }: Props) => {
  const { support, isFollowing, isPending, toggle } = useTeamNotification(teamId);
  const [guideOpen, setGuideOpen] = useState(false);
  // 알림을 켤 때마다 값이 바뀌어 아이콘이 다시 그려지면서 흔들림 애니메이션이 재생된다.
  const [ringCount, setRingCount] = useState(0);

  if (support === null || support === 'unsupported') return null;

  const handleClick = async () => {
    if (support === 'ios-install-required') {
      setGuideOpen(true);
      return;
    }
    if (support === 'in-app-browser') {
      toast.error('앱 안의 브라우저에서는 알림을 받을 수 없어요. Safari·Chrome에서 열어 주세요');
      return;
    }
    const following = await toggle();
    if (following && !isFollowing) setRingCount((count) => count + 1);
  };

  const Icon = isFollowing ? NotificationsFillIcon : NotificationsIcon;

  return (
    <>
      <button
        type="button"
        aria-label={isFollowing ? '팀 알림 끄기' : '팀 알림 받기'}
        aria-pressed={isFollowing}
        disabled={isPending}
        className={cn(
          'center h-full cursor-pointer disabled:cursor-wait disabled:opacity-50',
          className,
        )}
        onClick={handleClick}
      >
        <Icon
          key={ringCount}
          size={size}
          className={cn(
            isFollowing ? 'text-[var(--color-primary-600)]' : 'text-neutral-900',
            isFollowing && ringCount > 0 && 'origin-[50%_15%] motion-safe:animate-bell-ring',
          )}
        />
      </button>

      <InstallGuideModal open={guideOpen} onOpenChange={setGuideOpen} />
    </>
  );
};

type InstallGuideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const INSTALL_STEPS = [
  'Safari 하단의 공유 버튼을 눌러 주세요',
  "'홈 화면에 추가'를 선택해 주세요",
  '홈 화면의 훕치치 앱에서 다시 알림을 켜 주세요',
];

const InstallGuideModal = ({ open, onOpenChange }: InstallGuideModalProps) => (
  <Modal open={open} onOpenChange={onOpenChange}>
    <Modal.Content className="w-[min(360px,calc(100vw-32px))] rounded-2xl bg-white px-5 pt-6 pb-5 shadow-xl">
      <Modal.Title className="text-lg font-bold text-neutral-900">
        홈 화면에 추가하고 알림 받기
      </Modal.Title>
      <Modal.Description className="mt-1 text-sm text-neutral-500">
        iPhone에서는 홈 화면에 추가한 앱에서만 알림을 받을 수 있어요. (iOS 16.4 이상)
      </Modal.Description>

      <ol className="mt-4 flex flex-col gap-2">
        {INSTALL_STEPS.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 text-sm text-neutral-800"
          >
            <span className="center size-6 shrink-0 rounded-full bg-[var(--color-primary-500)] text-xs font-bold text-white">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      <Modal.Close asChild>
        <button
          type="button"
          className="mt-5 h-12 w-full rounded-xl bg-neutral-900 text-sm font-semibold text-white"
        >
          확인
        </button>
      </Modal.Close>
    </Modal.Content>
  </Modal>
);

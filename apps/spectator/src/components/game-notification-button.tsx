'use client';

import { NotificationsFillIcon, NotificationsIcon } from '@hcc/icons';
import { Modal, toast } from '@hcc/ui';
import { useState } from 'react';

import { useGame } from '~/api';
import { useGameNotification } from '~/hooks/useGameNotification';

type Props = {
  gameId: number;
};

export const GameNotificationButton = ({ gameId }: Props) => {
  const { data: game } = useGame({ gameId });
  const { support, isFollowing, isPending, toggle } = useGameNotification(gameId);
  const [guideOpen, setGuideOpen] = useState(false);

  // 끝난 경기는 더 받을 알림이 없다.
  if (!game || game.state === 'FINISHED') return null;
  if (support === null || support === 'unsupported') return null;

  const handleClick = () => {
    if (support === 'ios-install-required') {
      setGuideOpen(true);
      return;
    }
    if (support === 'in-app-browser') {
      toast.error('앱 안의 브라우저에서는 알림을 받을 수 없어요. Safari·Chrome에서 열어 주세요');
      return;
    }
    void toggle();
  };

  const Icon = isFollowing ? NotificationsFillIcon : NotificationsIcon;

  return (
    <>
      <button
        type="button"
        aria-label={isFollowing ? '경기 알림 끄기' : '경기 알림 받기'}
        aria-pressed={isFollowing}
        disabled={isPending}
        className="center h-full cursor-pointer disabled:cursor-wait disabled:opacity-50"
        onClick={handleClick}
      >
        <Icon
          size={24}
          className={isFollowing ? 'text-[var(--color-primary-600)]' : 'text-neutral-900'}
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

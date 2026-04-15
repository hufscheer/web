import { formatTime } from '@hcc/toolkit';
import { Button, colors, Modal, Typography } from '@hcc/ui';
import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { type TeamDirection, useCreateCheerTalkReport } from '~/api';

type Props = {
  cheerTalkId: number;
  direction: TeamDirection;
  logoImageUrl: string;
  content: string;
  createdAt: string;
};

export default function CheerTalkItem({
  cheerTalkId,
  direction,
  logoImageUrl,
  content,
  createdAt,
}: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: report } = useCreateCheerTalkReport();

  const handleReport = () => {
    report({ cheerTalkId });
    setOpen(false);
  };

  return (
    <>
      <div
        className={twMerge(
          'column gap-2 rounded-lg p-2.5',
          direction === 'HOME' ? 'self-start bg-[#F5F5F7]' : 'self-end bg-[#F2F8FF]',
        )}
      >
        <div className="center-y gap-1">
          <Typography color={colors.neutral600} fontSize={10} weight="medium" asChild>
            <button type="button" onClick={() => setOpen(true)}>
              신고
            </button>
          </Typography>
          <Typography color={colors.neutral600} fontSize={10} weight="medium" asChild>
            <span>|</span>
          </Typography>
          <Typography color={colors.neutral600} fontSize={10} weight="medium" asChild>
            <time>{formatTime(createdAt, { format: 'YYYY년 MM월 DD일 HH:mm' })}</time>
          </Typography>
        </div>

        <div
          className={twMerge(
            'flex items-center gap-1',
            direction === 'HOME' ? 'flex-row' : 'flex-row-reverse',
          )}
        >
          <Image
            className="size-4.5 overflow-hidden rounded-full object-cover"
            src={logoImageUrl}
            alt={`${direction} 팀 로고`}
            width={18}
            height={18}
          />
          <Typography color={colors.neutral900} fontSize={14}>
            {content}
          </Typography>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content className="w-90 rounded-lg bg-white px-6 py-6 shadow-xl">
          <Modal.Title className="mb-2 text-base font-semibold text-neutral-900">
            정말 이 응원톡을 신고할까요?
          </Modal.Title>
          <Modal.Description className="mb-6 text-sm text-neutral-500">
            신고한 응원톡은 검토 후 가려집니다.
          </Modal.Description>
          <div className="flex gap-3">
            <Modal.Close asChild>
              <Button
                color="black"
                variant="ghost"
                className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700"
              >
                그만두기
              </Button>
            </Modal.Close>
            <Button
              color="black"
              onClick={handleReport}
              className="flex-1 rounded-xl bg-neutral-900 py-2.5 text-sm font-medium text-white"
            >
              신고하기
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

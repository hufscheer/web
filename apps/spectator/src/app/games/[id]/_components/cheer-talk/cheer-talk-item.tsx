import { formatTime } from '@hcc/toolkit';
import { colors, Typography } from '@hcc/ui';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import type { TeamDirection } from '~/api';

type Props = {
  direction: TeamDirection;
  logoImageUrl: string;
  cheerTalkId: number;
  content: string;
  isBlocked: boolean;
  createdAt: string;
};

export default function CheerTalkItem({
  direction,
  logoImageUrl,
  cheerTalkId,
  content,
  isBlocked,
  createdAt,
}: Props) {
  return (
    <div
      className={twMerge(
        'column gap-2 rounded-lg p-2.5',
        direction === 'HOME' ? 'self-start bg-[#F5F5F7]' : 'self-end bg-[#F2F8FF]',
      )}
    >
      <div className="center-y gap-1">
        <Typography color={colors.neutral600} fontSize={10} weight="medium" asChild>
          <button type="button">신고</button>
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
          className="size-[18px] overflow-hidden rounded-full object-cover"
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
  );
}

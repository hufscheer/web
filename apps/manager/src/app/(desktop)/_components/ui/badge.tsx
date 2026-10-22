import type { ComponentProps } from 'react';

import { cn } from '~/utils/cn';

type Variant = 'default' | 'primary' | 'danger' | 'success' | 'warning';

/** `dot` 은 목록처럼 배지가 많이 깔리는 자리에, `soft` 는 표의 상태 칸에 쓴다 */
const dots: Record<Variant, string> = {
  default: 'bg-[var(--color-neutral-300)]',
  primary: 'bg-[var(--color-primary-600)]',
  danger: 'bg-[var(--color-danger-600)]',
  success: 'bg-[var(--color-rec-score)]',
  warning: 'bg-[var(--color-rec-warning)]',
};

const softs: Record<Variant, string> = {
  default: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
  primary: 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]',
  danger: 'bg-[var(--color-danger-100)] text-[var(--color-danger-700)]',
  success: 'bg-[var(--color-rec-score-soft)] text-[var(--color-rec-score)]',
  warning: 'bg-[var(--color-rec-warning-soft)] text-[var(--color-rec-warning)]',
};

type Props = ComponentProps<'span'> & {
  variant?: Variant;
  plain?: boolean;
  soft?: boolean;
};

export const Badge = ({
  variant = 'default',
  plain,
  soft,
  className,
  children,
  ...props
}: Props) => (
  <span
    className={cn(
      'text-t7 inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] leading-[18px] font-medium whitespace-nowrap',
      plain && 'border border-[var(--color-greyscale-50)] px-1.5 text-[var(--color-neutral-600)]',
      soft && `${softs[variant]} px-2 py-0.5 font-semibold`,
      !plain && !soft && 'px-0 text-[var(--color-neutral-600)]',
      className,
    )}
    {...props}
  >
    {!plain && !soft && <span className={cn('size-1.5 shrink-0 rounded-full', dots[variant])} />}
    {children}
  </span>
);

/** 진행 중은 빨간 점멸로 통일한다. 초록은 이미 득점 색이다 */
export const LiveBadge = ({
  className,
  soft,
  children = '진행 중',
  ...props
}: ComponentProps<'span'> & { soft?: boolean }) => (
  <span
    className={cn(
      'text-t7 inline-flex items-center gap-1.5 leading-[18px] font-semibold whitespace-nowrap text-[var(--color-danger-700)]',
      soft && 'rounded-[var(--radius-chip)] bg-[var(--color-danger-100)] px-2 py-0.5',
      className,
    )}
    {...props}
  >
    <span className="relative flex size-1.5 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-danger-600)] opacity-70 motion-reduce:hidden" />
      <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-danger-600)]" />
    </span>
    {children}
  </span>
);

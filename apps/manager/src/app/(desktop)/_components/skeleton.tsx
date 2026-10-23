import { cn } from '~/utils/cn';

export const Bar = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'animate-pulse rounded-[var(--radius-chip)] bg-[var(--color-neutral-100)]',
      className,
    )}
  />
);

export const PageSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="flex flex-col" aria-busy="true" aria-label="불러오는 중">
    <header className="flex h-(--spacing-topbar) shrink-0 items-center border-b border-[var(--color-greyscale-50)] px-4">
      <Bar className="h-3 w-28" />
    </header>
    <div className="flex flex-col px-6 py-5">
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={row}
          className="flex h-12 items-center gap-4 border-b border-[var(--color-hairline)] last:border-b-0"
        >
          <Bar className="h-3 w-9 shrink-0" />
          <Bar className="h-3 min-w-0 flex-1" />
          <Bar className="h-3 w-12 shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

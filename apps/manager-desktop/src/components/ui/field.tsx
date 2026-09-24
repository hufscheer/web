import type { ComponentProps, ReactNode } from 'react';

import { cn } from '~/utils/cn';

const controlClass =
  'h-8 w-full rounded-[var(--radius-control)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)] px-2.5 text-t6 shadow-[0_1px_1px_rgba(23,24,28,0.03)] transition-colors placeholder:text-[var(--color-neutral-300)] hover:border-[var(--color-neutral-300)] disabled:bg-[var(--color-greyscale-25)] disabled:text-[var(--color-neutral-400)] disabled:hover:border-[var(--color-greyscale-50)]';

export const TextInput = ({ className, ...props }: ComponentProps<'input'>) => (
  <input className={cn(controlClass, className)} {...props} />
);

export const SelectInput = ({ className, ...props }: ComponentProps<'select'>) => (
  <select className={cn(controlClass, 'cursor-pointer pr-1.5', className)} {...props} />
);

export const Field = ({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) => (
  <div className="grid grid-cols-[104px_minmax(0,1fr)] items-start gap-4 border-b border-[var(--color-hairline)] px-4 py-2.5 last:border-b-0">
    <span className="text-t6 pt-1.5 text-[var(--color-neutral-500)]">{label}</span>
    <div className="flex min-w-0 flex-col gap-1">
      {children}
      {hint && <p className="text-t7 text-[var(--color-neutral-400)]">{hint}</p>}
    </div>
  </div>
);

export const FormCard = ({
  title,
  actions,
  children,
  className,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      'overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-greyscale-50)] bg-[var(--color-canvas)]',
      className,
    )}
  >
    <header className="flex h-11 items-center justify-between gap-3 border-b border-[var(--color-greyscale-50)] px-4">
      <h2 className="text-t6 font-semibold text-[var(--color-neutral-900)]">{title}</h2>
      {actions}
    </header>
    {children}
  </section>
);

export const ErrorText = ({ children }: { children: ReactNode }) =>
  children ? (
    <p className="text-t7 font-medium text-[var(--color-danger-700)]">{children}</p>
  ) : null;

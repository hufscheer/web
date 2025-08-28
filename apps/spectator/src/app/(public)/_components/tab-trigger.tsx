import * as Tabs from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabTriggerProps {
  className?: string;
  value: string;
  children: ReactNode;
}

export const TabTrigger = ({ value, children, className }: TabTriggerProps) => {
  return (
    <Tabs.Trigger
      className={twMerge(
        'cursor-pointer border-b px-1.5 py-3 font-semibold text-neutral-950 text-sm transition-all duration-150',
        'data-[state=active]:border-neutral-950',
        'data-[state=inactive]:border-transparent data-[state=inactive]:text-neutral-400',
        className,
      )}
      value={value}
    >
      {children}
    </Tabs.Trigger>
  );
};

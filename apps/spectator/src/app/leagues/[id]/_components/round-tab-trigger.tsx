'use client';

import * as Tabs from '@radix-ui/react-tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabTriggerProps {
  className?: string;
  value: string;
  children: ReactNode;
}

export const RoundTabTrigger = ({ value, children, className }: TabTriggerProps) => {
  const pathname = usePathname();

  return (
    <Tabs.Trigger
      className={twMerge(
        'min-w-14 cursor-pointer border-b px-1.5 py-3 font-semibold text-neutral-950 text-sm transition-colors duration-150',
        'data-[state=active]:border-neutral-950',
        'data-[state=inactive]:border-transparent data-[state=inactive]:text-neutral-400',
        className,
      )}
      value={value}
      asChild
    >
      <Link className="text-center" href={{ pathname, query: { round: value } }} replace>
        {children}
      </Link>
    </Tabs.Trigger>
  );
};

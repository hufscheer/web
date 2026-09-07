'use client';

import type { ReactNode } from 'react';

import * as Tabs from '@radix-ui/react-tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface TabTriggerProps {
  className?: string;
  value: string;
  children: ReactNode;
  queryKey?: string;
  query?: Record<string, string>;
}

export const TabTrigger = ({
  value,
  children,
  className,
  queryKey = 'tab',
  query,
}: TabTriggerProps) => {
  const pathname = usePathname();

  return (
    <Tabs.Trigger
      className={twMerge(
        'cursor-pointer border-b-2 px-1.5 py-3 font-semibold text-neutral-950 text-sm transition-colors duration-150',
        'data-[state=active]:border-neutral-950',
        'data-[state=inactive]:border-transparent data-[state=inactive]:text-neutral-400',
        className,
      )}
      value={value}
      asChild
    >
      <Link
        className="text-center"
        href={{ pathname, query: { [queryKey]: value, ...query } }}
        replace
      >
        {children}
      </Link>
    </Tabs.Trigger>
  );
};

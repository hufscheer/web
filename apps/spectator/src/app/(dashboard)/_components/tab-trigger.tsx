'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TabTriggerProps {
  className?: string;
  value: string;
  children: ReactNode;
}

export const TabTrigger = ({ value, children, className }: TabTriggerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = () => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Tabs.Trigger
      className={twMerge(
        'cursor-pointer border-b px-1.5 py-3 font-semibold text-neutral-950 text-sm transition-colors duration-150',
        'data-[state=active]:border-neutral-950',
        'data-[state=inactive]:border-transparent data-[state=inactive]:text-neutral-400',
        className,
      )}
      value={value}
      onClick={handleTabChange}
    >
      {children}
    </Tabs.Trigger>
  );
};

'use client';

import { Tabs } from '@base-ui/react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

interface TabHeaderProps extends Tabs.Root.Props {}

export const TabHeader = ({ children, ...props }: TabHeaderProps) => {
  const segment = useSelectedLayoutSegment();
  const currentTab = segment === 'previous' || segment === 'teams' ? segment : 'recent';

  return (
    <Tabs.Root className="column h-full w-full bg-white" value={currentTab} {...props}>
      <Tabs.List className="center sticky top-12 z-header h-12 gap-5 border-neutral-100 border-b bg-white">
        <Tab
          value="previous"
          render={<Link href="previous">이전 대회</Link>}
          nativeButton={false}
        />
        <Tab value="recent" render={<Link href="/">최근 경기</Link>} nativeButton={false} />
        <Tab value="teams" render={<Link href="teams">팀별 보기</Link>} nativeButton={false} />

        <Tabs.Indicator className="absolute bottom-0 left-[var(--active-tab-left)] h-0.5 w-[var(--active-tab-width)] rounded-none bg-neutral-950 transition-[inset,width] duration-300" />
      </Tabs.List>

      {children}
    </Tabs.Root>
  );
};

const Tab = ({ children, className, ...props }: Tabs.Tab.Props) => {
  return (
    <Tabs.Tab
      className="cursor-pointer px-1.5 py-3 font-semibold text-neutral-950 text-sm transition-colors duration-150"
      {...props}
    >
      {children}
    </Tabs.Tab>
  );
};

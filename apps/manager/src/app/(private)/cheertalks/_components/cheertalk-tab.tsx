'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useSuspenseCheerTalkReport } from '~/api/queries/useCheerTalkReport';
import { useSuspenseCheerTalks } from '~/api/queries/useCheerTalks';
import { CheerTalkList } from './cheertalk-list';

type TabKey = 'ALL' | 'REPORTED';

const AllCheerTalkContent = () => {
  const { data } = useSuspenseCheerTalks({ cursor: 1, size: 2 });
  return <CheerTalkList cheerTalks={data} status="all" />;
};

const ReportedCheerTalkContent = () => {
  const { data } = useSuspenseCheerTalkReport({ cursor: 1, size: 2 });
  return <CheerTalkList cheerTalks={data} status="reported" />;
};

const TABS_CONFIG = [
  { key: 'ALL', label: '전체 응원톡', renderer: () => <AllCheerTalkContent /> },
  { key: 'REPORTED', label: '신고된 응원톡', renderer: () => <ReportedCheerTalkContent /> },
] as const;

export const CheerTalkTabs = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('ALL');

  return (
    <div className="flex h-screen flex-col gap-3">
      <div className="flex justify-center">
        <div className="relative flex w-full rounded-lg bg-gray-200 p-1">
          {TABS_CONFIG.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={twMerge(
                'flex-1 rounded-md py-1 text-center font-medium text-sm transition-colors duration-150 ease-in-out',
                activeTab === tab.key
                  ? 'bg-white text-black shadow-md'
                  : 'bg-transparent text-gray-500',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-[92px]">
        {TABS_CONFIG.find((tab) => tab.key === activeTab)?.renderer() || null}
      </div>
    </div>
  );
};

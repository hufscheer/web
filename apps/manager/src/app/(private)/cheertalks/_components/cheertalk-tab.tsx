'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { CheertalkList } from './cheertalk-list';
import { useSuspenseCheerTalks } from '~/api/queries/useCheerTalks';
import { useSuspenseCheerTalkReport } from '~/api/queries/useCheerTalkReport';

type TabKey = 'ALL' | 'REPORTED';
const AllCheerTalkContent = () => {
  const { data } = useSuspenseCheerTalks({ cursor: 1, size: 5 });
  console.log(data);
  return <CheertalkList cheerTalks={data} status="all" />;
};

const ReportedCheerTalkContent = () => {
  const { data } = useSuspenseCheerTalkReport({ cursor: 1, size: 2 });
  console.log(data);
  return <CheertalkList cheerTalks={data} status="reported" />;
};
const TABS_CONFIG = [
  {
    key: 'ALL',
    label: '전체 응원톡',
    renderer: () => <AllCheerTalkContent />,
  },
  {
    key: 'REPORTED',
    label: '신고된 응원톡',
    renderer: () => <ReportedCheerTalkContent />,
  },
] as const;

export default function CheerTalkTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('ALL');
  const ActiveContent = TABS_CONFIG.find(t => t.key === activeTab)?.renderer;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center">
        <div className="relative flex w-full rounded-lg bg-gray-200 p-1">
          {TABS_CONFIG.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={clsx(
                'flex-1 rounded-md py-2 text-center font-medium text-sm transition-all duration-300 ease-in-out',
                {
                  'bg-white text-black shadow-md': activeTab === tab.key,
                  'bg-transparent text-gray-500': activeTab !== tab.key,
                },
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>{ActiveContent ? <ActiveContent /> : null}</div>
    </div>
  );
}

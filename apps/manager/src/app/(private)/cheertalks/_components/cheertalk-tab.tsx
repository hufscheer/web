'use client';

import clsx from 'clsx';
import { useState } from 'react';

type TabKey = 'ALL' | 'REPORTED';
const AllCheerTalkContent = () => {
  return <div className="p-4 text-center text-gray-700">전체 응원톡 내용이 여기에 표시됩니다.</div>;
};

const ReportedCheerTalkContent = () => {
  return (
    <div className="p-4 text-center text-gray-700">신고된 응원톡 내용이 여기에 표시됩니다.</div>
  );
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

  return (
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
  );
}

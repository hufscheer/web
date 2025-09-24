'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { CheertalkList } from './cheertalk-list';

type TabKey = 'ALL' | 'REPORTED';
const AllCheerTalkContent = () => {
  return (
    <CheertalkList
      cheerTalk={{
        cheerTalkId: 1,
        content: '응원합니다! 화이팅!',
        gameTeamId: 101,
        createdAt: '2025-09-23T13:00:00',
        isBlocked: false,
        leagueName: '트로이카',
        gameName: '외대 VS 경희대',
      }}
      status="all"
    />
  );
};

const ReportedCheerTalkContent = () => {
  return (
    <CheertalkList
      cheerTalk={{
        cheerTalkId: 1,
        content: '응원합니다! 화이팅!',
        gameTeamId: 101,
        createdAt: '2025-09-23T13:00:00',
        isBlocked: false,
        leagueName: '트로이카',
        gameName: '외대 VS 경희대',
      }}
      status="reported"
    />
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

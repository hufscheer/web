import { Button } from '@hcc/ui';

interface TabNavigationProps {
  activeTab: string;
  onTabClick: (tabID: string) => void;
}

export const TabNavigation = ({ activeTab, onTabClick }: TabNavigationProps) => {
  const tabs = [
    { id: 'previous', label: '이전 대회' },
    { id: 'recent', label: '최근 대회' },
    { id: 'teams', label: '팀별 보기' },
  ];

  return (
    <div className="w-full border-gray-200 border-b bg-white pt-5">
      <div className="flex justify-center">
        <div role="tablist" aria-label="대회 탭" className="flex gap-8">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`-mb-px relative border-b-2 px-4 pb-4 font-medium transition-all duration-150 ease-out ${
                activeTab === tab.id
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              }`}
              variant="subtle"
              onClick={() => onTabClick(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

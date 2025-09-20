'use client';

import { Button } from '@hcc/ui';
import { useState, useMemo } from 'react';
import clsx from 'clsx';

type Team = { id: number; name: string };
type Affiliation = { id: number; name: string; teams: Team[] };

const AFFILIATIONS: Affiliation[] = [
  //임시 값
  {
    id: 1,
    name: '경영대학',
    teams: [
      { id: 101, name: '경영학과' },
      { id: 102, name: '경영정보학과' },
      { id: 103, name: '벤처중소기업학과' },
      { id: 104, name: '세무학과' },
      { id: 105, name: '글로벌경영학과' },
      { id: 106, name: '국제통상학과' },
      { id: 107, name: '금융학과' },
      { id: 108, name: '회계학과' },
    ],
  },
];

type SelectTeamProps = {
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

const SelectItem = ({ name, isSelected, onClick }: SelectTeamProps) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx('w-full p-3 text-left text-base', {
      'bg-[#007AFF] font-medium text-[#F2F8FF]': isSelected,
      'hover:bg-gray-100': !isSelected,
    })}
  >
    {name}
  </button>
);

type TeamCreationFormProps = {
  onClose: () => void;
  onRegister: (selection: { affiliation: Omit<Affiliation, 'teams'>; team: Team }) => void;
};

export const SelectTeam = ({ onClose, onRegister }: TeamCreationFormProps) => {
  const [selectedAffiliationId, setSelectedAffiliationId] = useState<number | null>(
    AFFILIATIONS[0]?.id || null,
  );
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const selectedAffiliation = useMemo(
    () => AFFILIATIONS.find(aff => aff.id === selectedAffiliationId),
    [selectedAffiliationId],
  );

  const handleRegister = () => {
    const selectedTeam = selectedAffiliation?.teams.find(t => t.id === selectedTeamId);
    if (selectedAffiliation && selectedTeam) {
      const affiliationData = {
        id: selectedAffiliation.id,
        name: selectedAffiliation.name,
      };
      onRegister({ affiliation: affiliationData, team: selectedTeam });
    }
  };

  return (
    <div className="flex h-[60vh] flex-col pt-4">
      <div className="flex flex-grow flex-row overflow-hidden">
        {/* 왼쪽 열: 소속 */}

        <div className="flex-1 border-r">
          <div className="w-full bg-[#EBECEE] p-3 text-left font-medium text-base">소속</div>
          <div className="overflow-y-auto">
            {AFFILIATIONS.map(affiliation => (
              <SelectItem
                key={affiliation.id}
                name={affiliation.name}
                isSelected={selectedAffiliationId === affiliation.id}
                onClick={() => {
                  setSelectedAffiliationId(affiliation.id);
                  setSelectedTeamId(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 열: 팀 */}
        <div className="flex flex-1 flex-col">
          <div className="w-full bg-[#EBECEE] p-3 text-left font-medium text-base">팀 이름</div>
          <div className="overflow-y-auto">
            {selectedAffiliation?.teams.map(team => (
              <SelectItem
                key={team.id}
                name={team.name}
                isSelected={selectedTeamId === team.id}
                onClick={() => setSelectedTeamId(team.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-row gap-2">
        <Button size="lg" color="black" variant="subtle" className="w-full" onClick={onClose}>
          취소
        </Button>
        <Button
          size="lg"
          className="w-full"
          color="black"
          onClick={handleRegister}
          disabled={!selectedTeamId}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

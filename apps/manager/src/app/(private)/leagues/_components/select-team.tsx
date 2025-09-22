'use client';

import { useTeams } from '~/api/queries/useTeams';
import { Button } from '@hcc/ui';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { TeamType } from '~/api';

type Team = { id: number; name: string };
type Affiliation = { id: number; name: string; teams: Team[] };

type SelectItemProps = {
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

const SelectItem = ({ name, isSelected, onClick }: SelectItemProps) => (
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
  const { data: teams = [], isLoading } = useTeams();

  const affiliations = useMemo(() => {
    const units: { [key: string]: TeamType[] } = {};
    teams.forEach(team => {
      if (!units[team.unit]) {
        units[team.unit] = [];
      }
      units[team.unit].push(team);
    });

    return Object.keys(units).map((unit, index) => ({
      id: index + 1,
      name: unit,
      teams: units[unit].map(team => ({
        id: team.id,
        name: team.name,
      })),
    }));
  }, [teams]);

  const [selectedAffiliationId, setSelectedAffiliationId] = useState<string | null>(
    affiliations[0]?.name || null,
  );
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const selectedAffiliation = useMemo(
    () => affiliations.find(aff => aff.name === selectedAffiliationId),
    [affiliations, selectedAffiliationId],
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

  if (isLoading) {
    return <div className="p-4 text-center">팀 정보를 불러오는 중입니다...</div>;
  }
  if (affiliations.length === 0) {
    return <div className="p-4 text-center">불러올 팀 정보가 없습니다.</div>;
  }

  return (
    <div className="flex h-[60vh] flex-col pt-4">
      <div className="flex flex-grow flex-row overflow-hidden">
        {/* 왼쪽 열: 소속 */}
        <div className="flex-1 border-r">
          <div className="w-full bg-[#EBECEE] p-3 text-left font-medium text-base">소속</div>
          <div className="overflow-y-auto">
            {affiliations.map(affiliation => (
              <SelectItem
                key={affiliation.id}
                name={affiliation.name}
                isSelected={selectedAffiliationId === affiliation.name}
                onClick={() => {
                  setSelectedAffiliationId(affiliation.name);
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

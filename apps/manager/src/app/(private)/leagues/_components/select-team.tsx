'use client';

import { KoFuzzy } from '@hcc/ko-fuzzy';
import { Button } from '@hcc/ui';
import clsx from 'clsx';
import { useDeferredValue, useMemo, useState } from 'react';

import type { SportType } from '~/api';

import { useTeams } from '~/api/queries/useTeams';

type RegisteredTeam = {
  affiliationName: string;
  teamName: string;
  teamId: number;
};
type Team = { id: number; name: string };

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
  value: string;
  onClose: () => void;
  onRegister: (teams: RegisteredTeam[]) => void;
  maxSelectCount: number;
  sportType: SportType;
};

export const SelectTeam = ({
  value,
  onClose,
  onRegister,
  maxSelectCount,
  sportType,
}: TeamCreationFormProps) => {
  const { data: teams = [], isLoading } = useTeams();
  const deferredValue = useDeferredValue(value);

  const groupedByUnit = useMemo(() => {
    const filtered = teams.filter((team) => team.sportType === sportType);
    const units = filtered.reduce<Record<string, Team[]>>((acc, team) => {
      if (!acc[team.unit]) {
        acc[team.unit] = [];
      }
      acc[team.unit].push({ id: team.id, name: team.name });
      return acc;
    }, {});

    return Object.keys(units).map((unit, index) => ({
      id: index + 1,
      name: unit,
      teams: units[unit],
    }));
  }, [teams, sportType]);

  const affiliations = useMemo(() => {
    const query = deferredValue.trim();
    if (!query) return groupedByUnit;

    return groupedByUnit
      .map((affiliation) => {
        const fuzzy = new KoFuzzy(affiliation.teams, { keys: ['name'] });
        return {
          ...affiliation,
          teams: fuzzy.search(query).map((result) => result.item),
        };
      })
      .filter((affiliation) => affiliation.teams.length > 0);
  }, [groupedByUnit, deferredValue]);

  const [selectedAffiliationId, setSelectedAffiliationId] = useState<string | null>(
    affiliations[0]?.name || null,
  );
  const [selectedTeams, setSelectedTeams] = useState<RegisteredTeam[]>([]);
  const selectedAffiliation = useMemo(
    () => affiliations.find((aff) => aff.name === selectedAffiliationId),
    [affiliations, selectedAffiliationId],
  );
  const handleTeamClick = (team: Team) => {
    if (!selectedAffiliation) return;

    const isAlreadySelected = selectedTeams.some((t) => t.teamId === team.id);

    if (isAlreadySelected) {
      // 이미 선택된 팀이면 제거
      setSelectedTeams((prev) => prev.filter((t) => t.teamId !== team.id));
    } else {
      // 새로운 팀 선택 시 최대 개수 제한 확인
      if (selectedTeams.length >= maxSelectCount) {
        alert(`최대 ${maxSelectCount}팀까지 선택할 수 있습니다.`);
        return;
      }
      // 선택 목록에 추가
      setSelectedTeams((prev) => [
        ...prev,
        {
          affiliationName: selectedAffiliation.name,
          teamName: team.name,
          teamId: team.id,
        },
      ]);
    }
  };
  const handleRegister = () => {
    if (selectedTeams.length > 0) {
      onRegister(selectedTeams);
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
          <div className="w-full bg-[#EBECEE] p-3 text-left text-base font-medium">소속</div>
          <div className="overflow-y-auto">
            {affiliations.map((affiliation) => (
              <SelectItem
                key={affiliation.id}
                name={affiliation.name}
                isSelected={selectedAffiliationId === affiliation.name}
                onClick={() => {
                  setSelectedAffiliationId(affiliation.name);
                }}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 열: 팀 */}
        <div className="flex flex-1 flex-col">
          <div className="w-full bg-[#EBECEE] p-3 text-left text-base font-medium">팀 이름</div>
          <div className="overflow-y-auto">
            {selectedAffiliation?.teams.map((team) => (
              <SelectItem
                key={team.id}
                name={team.name}
                isSelected={selectedTeams.some((t) => t.teamId === team.id)}
                onClick={() => handleTeamClick(team)}
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
          disabled={selectedTeams.length === 0}
        >
          등록
        </Button>
      </div>
    </div>
  );
};

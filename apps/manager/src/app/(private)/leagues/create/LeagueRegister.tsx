'use client';

import { AddIcon, CloseIcon } from '@hcc/icons';
import { Button, Input, Typography } from '@hcc/ui';
import { useMemo, useState } from 'react';
import { Drawer } from 'vaul';
import { SelectTeam } from '../_components/select-team';
import { type LeagueFormType, useCreateLeagues } from '~/api/mutations/useCreateLeagues';
import { useRouter } from 'next/navigation';

type Team = { id: number; name: string };
type Affiliation = { id: number; name: string };
type RegisteredTeam = {
  affiliationName: string;
  teamName: string;
  teamId: number;
};

type Props = {
  onPrev: () => void;
  round: number;
  leagueInfoForm: Omit<LeagueFormType, 'teamIds'>;
};

const LeagueRegister = ({ onPrev, round, leagueInfoForm }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [registeredTeams, setRegisteredTeams] = useState<RegisteredTeam[]>([]);
  const { mutate, isPending } = useCreateLeagues();
  const maxTeams = useMemo(() => round ?? 32, [round]);
  const isFull = registeredTeams.length >= maxTeams;
  const handleRegisterTeam = ({ affiliation, team }: { affiliation: Affiliation; team: Team }) => {
    // 중복 등록 방지
    if (isFull) return;
    if (!registeredTeams.find(rt => rt.teamId === team.id)) {
      setRegisteredTeams(prevTeams => [
        ...prevTeams,
        {
          affiliationName: affiliation.name,
          teamName: team.name,
          teamId: team.id,
        },
      ]);
    }
    setIsOpen(false);
  };

  const handleRemoveTeam = (teamId: number) => {
    setRegisteredTeams(prevTeams => prevTeams.filter(team => team.teamId !== teamId));
  };
  const handleCreateLeague = () => {
    const teamIds = registeredTeams.map(team => team.teamId);

    const payload: LeagueFormType = {
      ...leagueInfoForm,
      teamIds: teamIds,
    };

    mutate(payload, {
      onSuccess: () => {
        router.push('/leagues');
      },
      onError: error => {
        alert(`대회 생성에 실패했습니다: ${error.message}`);
      },
    });
  };
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-full flex-col gap-4 bg-white p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-black text-lg">참가 팀</div>
          <span className="flex flex-row font-semibold text-base">
            <Typography color="var(--color-primary-600)" weight="semibold">
              {registeredTeams.length}
            </Typography>
            /{round}
          </span>
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {registeredTeams.map(team => (
            <Button
              key={team.teamId}
              variant="subtle"
              onClick={() => handleRemoveTeam(team.teamId)}
            >
              <div className="flex flex-row items-center gap-2 p-3">
                <span>{team.teamName}</span>
                <CloseIcon width={16} height={16} color="var(--color-primary-600)" />
              </div>
            </Button>
          ))}
        </div>

        <Drawer.Trigger asChild>
          <Button size="lg" color="black" variant="subtle" className="w-full">
            <AddIcon />
            새로운 팀 추가
          </Button>
        </Drawer.Trigger>
        <div className="mt-auto flex flex-col gap-2">
          <Button size="lg" variant="subtle" className="w-full" onClick={onPrev}>
            이전 단계
          </Button>
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onClick={handleCreateLeague}
            disabled={isPending || registeredTeams.length === 0}
            loading={isPending}
          >
            대회 생성
          </Button>
        </div>
      </div>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex flex-col rounded-t-lg bg-white">
          <div className="flex-1 rounded-t-lg p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Drawer.Title className="mb-4 text-start font-semibold text-2xl">팀 선택</Drawer.Title>
            <Input size="lg" placeholder="팀 이름을 검색해주세요">
              {/* 아이콘추가 */}
            </Input>
            <SelectTeam onClose={() => setIsOpen(false)} onRegister={handleRegisterTeam} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LeagueRegister;

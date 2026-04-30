'use client';

import { AddIcon, CloseIcon } from '@hcc/icons';
import { Button, Input, Typography } from '@hcc/ui';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Drawer } from 'vaul';

import { type LeagueFormType, useCreateLeagues } from '~/api/mutations/useCreateLeagues';
import { AlertDialog } from '~/components/ui';

import { SelectTeam } from '../_components/select-team';

type RegisteredTeam = {
  affiliationName: string;
  teamName: string;
  teamId: number;
};

type Props = {
  onPrev: () => void;
  round: number;
  leagueInfoForm: Omit<LeagueFormType, 'teamIds'>;
  initialTeams?: RegisteredTeam[];
  onSubmit?: (teamIds: number[]) => void;
};

const LeagueRegister = ({ onPrev, round, leagueInfoForm, initialTeams = [], onSubmit }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [registeredTeams, setRegisteredTeams] = useState<RegisteredTeam[]>(initialTeams);
  const { mutate, isPending } = useCreateLeagues();
  const maxTeams = useMemo(() => round ?? 32, [round]);

  const isEditMode = !!onSubmit;

  const handleRegisterTeam = (newTeams: RegisteredTeam[]) => {
    setRegisteredTeams((prevTeams) => {
      // 기존에 없던 팀들만 필터링하여 합치기 (중복 방지)
      const uniqueNewTeams = newTeams.filter(
        (nt) => !prevTeams.some((pt) => pt.teamId === nt.teamId),
      );

      // 최대 참가 팀 수 제한 체크
      const combined = [...prevTeams, ...uniqueNewTeams];
      return combined.slice(0, maxTeams);
    });
    setIsOpen(false);
  };

  const handleRemoveTeam = (teamId: number) => {
    setRegisteredTeams((prevTeams) => prevTeams.filter((team) => team.teamId !== teamId));
  };
  const handleCreateLeague = () => {
    const teamIds = registeredTeams.map((team) => team.teamId);

    if (isEditMode) {
      onSubmit(teamIds);
      return;
    }
    const payload: LeagueFormType = {
      ...leagueInfoForm,
      teamIds: teamIds,
    };

    mutate(payload, {
      onSuccess: () => {
        router.push('/leagues');
      },
      onError: (error) => {
        alert(`대회 생성에 실패했습니다: ${error.message}`);
      },
    });
  };
  const isAllTeamsRegistered = registeredTeams.length === round;
  const CreateButton = (
    <Button
      size="lg"
      className="w-full"
      color="primary"
      disabled={isPending || registeredTeams.length === 0}
      loading={isPending}
      onClick={isAllTeamsRegistered ? handleCreateLeague : undefined}
    >
      대회 생성
    </Button>
  );
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-full flex-col gap-4 bg-white p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="text-lg font-semibold text-black">참가 팀</div>
          <span className="flex flex-row text-base font-semibold">
            <Typography color="var(--color-primary-600)" weight="semibold">
              {registeredTeams.length}
            </Typography>
            /{round}
          </span>
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {registeredTeams.map((team) => (
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
          {isAllTeamsRegistered ? (
            CreateButton
          ) : (
            <AlertDialog
              title="아직 모든 팀이 등록되지 않았어요"
              description="정말 생성할까요?"
              primaryTitle="확인"
              onPrimaryClick={handleCreateLeague}
            >
              {CreateButton}
            </AlertDialog>
          )}
        </div>
      </div>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex flex-col rounded-t-lg bg-white">
          <div className="flex-1 rounded-t-lg p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Drawer.Title className="mb-4 text-start text-2xl font-semibold">팀 선택</Drawer.Title>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="lg"
              placeholder="팀 이름을 검색해주세요"
            />
            <SelectTeam
              onClose={() => setIsOpen(false)}
              value={value}
              onRegister={handleRegisterTeam}
              maxSelectCount={maxTeams - registeredTeams.length}
              sportType={leagueInfoForm.sportType}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LeagueRegister;

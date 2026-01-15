'use client';

import { type ComponentProps, useState } from 'react';
import { StepProgress } from '~/components/ui';
import { SwitchCase } from '~/components/feature';
import type { LeagueFormType } from '~/api';
import LeagueInfo, { type LeagueInfoForm } from '../../../create/LeagueInfo';
import LeagueRegister from '../../../create/LeagueRegister';

type RegisteredTeam = {
  affiliationName: string;
  teamName: string;
  teamId: number;
};

type Props = {
  initialData?: Partial<LeagueFormType>;
  initialTeams?: RegisteredTeam[];
  onSubmit: (data: LeagueFormType) => Promise<void> | void;
  isEdit?: boolean;
} & Omit<ComponentProps<'form'>, 'onSubmit'>;
const STEPS = ['기본 정보', '참가 팀 등록'];

export const LeagueForm = ({ initialData, initialTeams, onSubmit, isEdit }: Props) => {
  const [step, setStep] = useState<0 | 1>(0);
  const [formData, setFormData] = useState<LeagueInfoForm>({
    name: initialData?.name ?? '',
    startAt: initialData?.startAt ? new Date(initialData.startAt) : undefined,
    endAt: initialData?.endAt ? new Date(initialData.endAt) : undefined,
    maxRound: initialData?.maxRound,
  });
  const handleFormChange = (patch: Partial<LeagueInfoForm>) => {
    setFormData(prev => ({
      ...prev,
      ...patch,
    }));
  };
  const handleUpdate = (teamIds: number[]) => {
    if (!formData.name || !formData.startAt || !formData.endAt || formData.maxRound === undefined) {
      return;
    }

    const payload: LeagueFormType = {
      name: formData.name,
      maxRound: formData.maxRound,
      startAt: formData.startAt.toISOString(),
      endAt: formData.endAt.toISOString(),
      teamIds,
    };

    onSubmit(payload);
  };
  return (
    <div className="flex h-full w-full flex-col bg-white p-4">
      <StepProgress currentStep={step + 1} steps={STEPS} />

      <div className="mt-6 flex-1">
        <SwitchCase
          value={step}
          caseBy={{
            0: (
              <LeagueInfo
                form={formData}
                onChange={handleFormChange}
                onNext={() => setStep(1)}
                isFormValid={!!formData.name && !!formData.startAt}
                isEdit={isEdit}
              />
            ),
            1: (
              <LeagueRegister
                onPrev={() => setStep(0)}
                round={formData.maxRound ?? 0}
                leagueInfoForm={{
                  name: formData.name,
                  maxRound: formData.maxRound ?? 0,
                  startAt: formData.startAt?.toISOString() ?? '',
                  endAt: formData.endAt?.toISOString() ?? '',
                }}
                initialTeams={initialTeams}
                onSubmit={handleUpdate}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

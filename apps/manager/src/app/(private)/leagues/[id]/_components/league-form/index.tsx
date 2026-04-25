'use client';

import { type ComponentProps, useState } from 'react';

import type { LeagueFormType } from '~/api';

import { SwitchCase } from '~/components/feature';
import { StepProgress } from '~/components/ui';

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
} & Omit<ComponentProps<'form'>, 'onSubmit'>;
const STEPS = ['기본 정보', '참가 팀 등록'];

const toUTCDateString = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();

export const LeagueForm = ({ initialData, initialTeams, onSubmit }: Props) => {
  const [step, setStep] = useState<0 | 1>(0);
  const [formData, setFormData] = useState<LeagueInfoForm>({
    name: initialData?.name ?? '',
    startAt: initialData?.startAt ? new Date(initialData.startAt) : undefined,
    endAt: initialData?.endAt ? new Date(initialData.endAt) : undefined,
    maxRound: initialData?.maxRound,
    sportType: initialData?.sportType ?? 'SOCCER',
  });
  const handleFormChange = (patch: Partial<LeagueInfoForm>) => {
    setFormData((prev) => ({
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
      startAt: toUTCDateString(formData.startAt),
      endAt: toUTCDateString(formData.endAt),
      teamIds,
      sportType: formData.sportType ?? 'SOCCER',
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
              <LeagueInfo>
                <LeagueInfo.SportSelect
                  value={formData.sportType}
                  onChange={(sportType) => handleFormChange({ sportType })}
                  disabled
                />
                <LeagueInfo.Fields form={formData} onChange={handleFormChange} />
                <LeagueInfo.Actions
                  onNext={() => setStep(1)}
                  isFormValid={
                    !!formData.name && !!formData.startAt && !!formData.endAt && !!formData.maxRound
                  }
                />
              </LeagueInfo>
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
                  sportType: formData?.sportType ?? 'SOCCER',
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

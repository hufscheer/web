'use client';

import { Suspense } from '@suspensive/react';
import { useMemo, useState } from 'react';

import { Header } from '~/components/layout';
import { StepProgress } from '~/components/ui';

import LeagueInfo, { type LeagueInfoForm } from './LeagueInfo';
import LeagueRegister from './LeagueRegister';

const Page = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [form, setForm] = useState<LeagueInfoForm>({
    name: '',
    startAt: undefined,
    endAt: undefined,
    maxRound: undefined,
    thirdPlaceMatchEnabled: false,
    sportType: 'SOCCER',
    bracketEnabled: false,
  });

  const isFormValid = useMemo(() => {
    return form.name.trim() !== '' && !!form.startAt && !!form.endAt && !!form.maxRound;
  }, [form]);

  const handleFormChange = (patch: Partial<LeagueInfoForm>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const goNext = () => {
    if (!isFormValid) return;
    setCurrentStep(2);
  };

  const leagueInfoForm = useMemo(
    () => ({
      name: form.name,
      maxRound: form.maxRound ?? 0,
      startAt: form.startAt?.toISOString() ?? '',
      endAt: form.endAt?.toISOString() ?? '',
      thirdPlaceMatchEnabled: form.thirdPlaceMatchEnabled,
      sportType: form.sportType,
      bracketEnabled: form.bracketEnabled,
    }),
    [form],
  );

  return (
    <>
      <Header title="신규 대회 만들기" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <div className="w-auto px-10">
            <StepProgress steps={['기본 정보', '참가 팀 등록']} currentStep={currentStep} />
          </div>

          <div className="flex-grow">
            {currentStep === 1 && (
              <LeagueInfo>
                <LeagueInfo.SportSelect
                  value={form.sportType}
                  onChange={(sportType) => handleFormChange({ sportType })}
                />
                <LeagueInfo.Fields form={form} onChange={handleFormChange} />
                <LeagueInfo.Actions onNext={goNext} isFormValid={isFormValid} />
              </LeagueInfo>
            )}

            {currentStep === 2 && (
              <LeagueRegister
                onPrev={() => setCurrentStep(1)}
                round={form.maxRound ?? 0}
                leagueInfoForm={leagueInfoForm}
              />
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Page;

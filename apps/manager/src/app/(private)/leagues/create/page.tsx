'use client';
import { Suspense } from '@suspensive/react';
import { Header } from '~/components/layout';
import { StepProgress } from '~/components/ui';
import { useMemo, useState } from 'react';
import LeagueInfo, { type LeagueForm } from './LeagueInfo';
import LeagueRegister from './LeagueRegister';

const Page = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [form, setForm] = useState<LeagueForm>({
    leagueName: '',
    startDate: undefined,
    endDate: undefined,
    roundSize: undefined,
  });

  const isFormValid = useMemo(() => {
    return form.leagueName.trim() !== '' && !!form.startDate && !!form.endDate && !!form.roundSize;
  }, [form]);

  const handleFormChange = (patch: Partial<LeagueForm>) => {
    setForm(prev => ({ ...prev, ...patch }));
  };

  const goNext = () => {
    if (!isFormValid) return;
    setCurrentStep(2);
  };
  const leagueInfoForm = useMemo(
    () => ({
      name: form.leagueName,
      maxRound: form.roundSize!,
      startAt: form.startDate?.toISOString() ?? '',
      endAt: form.endDate?.toISOString() ?? '',
    }),
    [form],
  );

  return (
    <>
      <Header title="신규 대회 만들기" arrow />

      <div className="column h-full gap-1.5 bg-white p-5">
        <Suspense clientOnly>
          <div className="w-auto px-10">
            <StepProgress steps={['기본 정보', '참가 팀등록']} currentStep={currentStep} />
          </div>

          <div className="flex-grow">
            {currentStep === 1 && (
              <LeagueInfo
                form={form}
                onChange={handleFormChange}
                onNext={goNext}
                isFormValid={isFormValid}
              />
            )}

            {currentStep === 2 && (
              <LeagueRegister
                onPrev={() => setCurrentStep(1)}
                round={form.roundSize ?? 0}
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

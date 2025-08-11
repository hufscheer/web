//progressbar 생성할file
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';

import { leagueFormSchema, LeagueFormSchema } from '../_components/LeagueForm';
import * as styles from '../_components/LeagueForm/styles.css';
import LeagueInfo from '../_components/LeagueInfo';
import ProgressBar from '../_components/progressbar';

export default function Page() {
  const router = useRouter();

  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      leagueName: '',
      round: '',
      status: '',
      quarter: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const { watch } = methods;
  const leagueName = watch('leagueName');
  const round = watch('round');
  const quarter = watch('quarter');
  const status = watch('status');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // 각 단계별 활성화 상태
  const [step1Active, setStep1Active] = useState(false);

  // 각 단계별 완료 상태 계산
  const step1Completed =
    !!leagueName && !!round && !!quarter && !!status && !!startDate && !!endDate;

  // 1단계 focus/blur/click 핸들러
  const handleStep1Focus = () => setStep1Active(true);
  const handleStep1Blur = () => setStep1Active(false);
  const handleStep1Click = () => setStep1Active(true);

  // 경기 정보 입력이 완료되면 자동으로 다음 단계로 이동
  useEffect(() => {
    if (step1Completed) {
      const params = new URLSearchParams({
        leagueName: leagueName || '',
        round: round || '',
        quarter: quarter || '',
        status: status || '',
        startDate: startDate?.toISOString() || '',
        endDate: endDate?.toISOString() || '',
      });
      router.push(`/league/newRegister/step2?${params.toString()}`);
    }
  }, [step1Completed, leagueName, round, quarter, status, startDate, endDate, router]);

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <div className={styles.scrollArea}>
        <form className={styles.form}>
          <div className={styles.progressBar}>
            <ProgressBar
              currentStep={1}
              step1Completed={step1Completed}
              step2Completed={false}
              step3Completed={false}
              step1Active={step1Active}
              step2Active={false}
              step3Active={false}
            />
          </div>

          <LeagueInfo
            methods={methods}
            onSubmit={() => {}}
            submitText=""
            onStep1Click={handleStep1Click}
            onStep1Focus={handleStep1Focus}
            onStep1Blur={handleStep1Blur}
          />
        </form>
      </div>
    </Layout>
  );
}

'use client';
import { useCreateLeague } from '@hcc/api';
import { toast, Button } from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import { formatTime } from '@/utils/time';

import { leagueFormSchema, LeagueFormSchema } from '../../_components/LeagueForm';
import * as styles from '../../_components/LeagueForm/styles.css';
import LeagueVideo from '../../_components/LeagueVideo';
import ProgressBar from '../../_components/progressbar';

type Step3Props = {
  searchParams: {
    leagueName?: string;
    round?: string;
    quarter?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    team1?: string;
    team2?: string;
  };
};

export default function Step3Page({ searchParams }: Step3Props) {
  const router = useRouter();

  const methods = useForm<LeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      leagueName: searchParams.leagueName || '',
      round: searchParams.round || '',
      quarter: searchParams.quarter || '',
      status: searchParams.status || '',
      startDate: searchParams.startDate ? new Date(searchParams.startDate) : new Date(),
      endDate: searchParams.endDate ? new Date(searchParams.endDate) : new Date(),
    },
  });

  // URL 입력 값 (임시로 직접 관리)
  const [videoUrl, setVideoUrl] = useState('');

  // 각 단계별 활성화 상태
  const [step3Active, setStep3Active] = useState(false);

  // 각 단계별 완료 상태 계산
  const step1Completed = true; // 첫 번째 단계는 이미 완료
  const step2Completed = true; // 두 번째 단계는 이미 완료
  const step3Completed = !!videoUrl;

  // 3단계 focus/blur/click 핸들러
  const handleStep3Focus = () => setStep3Active(true);
  const handleStep3Blur = () => setStep3Active(false);
  const handleStep3Click = () => setStep3Active(true);

  const { mutate: createLeague, isPending } = useCreateLeague();

  const onSubmit = (data: LeagueFormSchema) => {
    if (isPending) return;

    const { leagueName, round, startDate, endDate } = data;
    createLeague(
      {
        name: leagueName,
        maxRound: Number(round),
        startAt: formatTime(startDate, 'YYYY-MM-DDTHH:mm:ss'),
        endAt: formatTime(endDate, 'YYYY-MM-DDT23:59:59'),
      },
      {
        onSuccess: () => {
          toast({ title: '대회가 생성되었습니다', variant: 'destructive' });
          router.back();
        },
        onError: () => {
          toast({
            title: '대회 생성에 실패했습니다',
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <div className={styles.scrollArea}>
        <form className={styles.form}>
          <div className={styles.progressBar}>
            <ProgressBar
              currentStep={3}
              step1Completed={step1Completed}
              step2Completed={step2Completed}
              step3Completed={step3Completed}
              step1Active={false}
              step2Active={false}
              step3Active={step3Active}
            />
          </div>

          <LeagueVideo
            methods={methods}
            onSubmit={onSubmit}
            submitText="경기 생성"
            onStep3Focus={handleStep3Focus}
            onStep3Blur={handleStep3Blur}
            onStep3Click={handleStep3Click}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
          />

          <Button
            className={styles.button}
            type="submit"
            fullWidth
            disabled={!step3Completed}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(methods.getValues());
            }}
          >
            경기 생성
          </Button>
        </form>
      </div>
    </Layout>
  );
}

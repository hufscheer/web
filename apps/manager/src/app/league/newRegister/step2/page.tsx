'use client';
import { Button } from '@hcc/ui';
//import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
//import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';

//import { leagueFormSchema, LeagueFormSchema } from '../../_components/LeagueForm';
import * as styles from '../../_components/LeagueForm/styles.css';
import LeagueTeams from '../../_components/LeagueTeams';
import ProgressBar from '../../_components/progressbar';

type Step2Props = {
  searchParams: {
    leagueName?: string;
    round?: string;
    quarter?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
};

export default function Step2Page({ searchParams }: Step2Props) {
  const router = useRouter();

  //const methods = useForm<LeagueFormSchema>({
  //  resolver: zodResolver(leagueFormSchema),
  //  defaultValues: {
  //    leagueName: searchParams.leagueName || '',
  //    round: searchParams.round || '',
  //    quarter: searchParams.quarter || '',
  //    status: searchParams.status || '',
  //    startDate: searchParams.startDate ? new Date(searchParams.startDate) : new Date(),
  //    endDate: searchParams.endDate ? new Date(searchParams.endDate) : new Date(),
  //  },
  //});

  // 팀 선택 상태 (임시로 직접 관리)
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['', '']);

  // 각 단계별 활성화 상태
  const [step2Active, setStep2Active] = useState(false);

  // 각 단계별 완료 상태 계산
  const step1Completed = true; // 첫 번째 단계는 이미 완료
  const step2Completed = selectedTeams.length >= 2 && selectedTeams.every((team) => !!team);

  // 2단계 focus/blur/click 핸들러
  const handleStep2Focus = () => setStep2Active(true);
  const handleStep2Blur = () => setStep2Active(false);
  const handleStep2Click = () => setStep2Active(true);

  // 참가 팀 선택이 완료되면 자동으로 다음 단계로 이동
  useEffect(() => {
    if (step2Completed) {
      const params = new URLSearchParams({
        leagueName: searchParams.leagueName || '',
        round: searchParams.round || '',
        quarter: searchParams.quarter || '',
        status: searchParams.status || '',
        startDate: searchParams.startDate || '',
        endDate: searchParams.endDate || '',
        team1: selectedTeams[0] || '',
        team2: selectedTeams[1] || '',
      });
      router.push(`/league/newRegister/step3?${params.toString()}`);
    }
  }, [step2Completed, selectedTeams, searchParams, router]);

  return (
    <Layout navigationTitle="새로운 경기 생성">
      <div className={styles.scrollArea}>
        <form className={styles.form}>
          <div className={styles.progressBar}>
            <ProgressBar
              currentStep={2}
              step1Completed={step1Completed}
              step2Completed={step2Completed}
              step3Completed={false}
              step1Active={false}
              step2Active={step2Active}
              step3Active={false}
            />
          </div>

          <LeagueTeams
            teamOptions={[]}
            onTeamChange={() => {}}
            onLineupEdit={() => {}}
            selectedTeams={[]}
            onStep2Click={handleStep2Click}
            onStep2Focus={handleStep2Focus}
            onStep2Blur={handleStep2Blur}
            selectedTeamsState={selectedTeams}
            setSelectedTeamsState={setSelectedTeams}
          />

          <Button
            className={styles.button}
            type="submit"
            fullWidth
            disabled={!step2Completed}
            onClick={(e) => {
              e.preventDefault();
              // 자동으로 다음 단계로 이동하므로 여기서는 아무것도 하지 않음
            }}
          >
            다음 단계
          </Button>
        </form>
      </div>
    </Layout>
  );
}

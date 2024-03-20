'use client';

import { Stepper } from '@mantine/core';
import { useState } from 'react';

import Layout from '@/components/Layout';

import LeagueInfo from './_components/LeagueInfo';
import LeagueTeam from './_components/LeagueTeam';
import LeagueTeamPlayers from './_components/LeagueTeamPlayers';
import { stepperResolver } from './resolvers';

// import * as styles from './page.css';

export default function Register() {
  const [leagueId, setLeagueId] = useState<number>(-1);
  const [teamId, setTeamId] = useState<number>(-1);

  const [active, setActive] = useState(0);
  const handleLeagueId = (step: number) => {
    setActive(step);
  };

  return (
    <Layout navigationTitle="대회 생성">
      <Stepper active={active} vars={stepperResolver}>
        <Stepper.Step label="대회 정보">
          <LeagueInfo
            nextStep={() => handleLeagueId(1)}
            handleLeagueId={(id: number) => setLeagueId(id)}
          />
        </Stepper.Step>

        <Stepper.Step label="대회 팀">
          <LeagueTeam
            leagueId={leagueId}
            handleTeamId={(id: number) => setTeamId(id)}
            nextStep={() => handleLeagueId(2)}
          />
        </Stepper.Step>
        <Stepper.Step label="대회 로고">
          <LeagueTeamPlayers
            teamId={teamId}
            prevStep={() => handleLeagueId(1)}
          />
        </Stepper.Step>
      </Stepper>
    </Layout>
  );
  // useFunnel 필요
}

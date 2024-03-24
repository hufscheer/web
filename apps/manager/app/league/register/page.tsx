'use client';

import { Stepper } from '@mantine/core';
import { useState } from 'react';

import Layout from '@/components/Layout';

import ConfirmModal from './_components/Confirm';
import LeagueInfo from './_components/LeagueInfo';
import LeagueTeam from './_components/LeagueTeam';
import LeagueTeamPlayers from './_components/LeagueTeamPlayers';
import { stepperResolver } from './resolvers';

export default function Register() {
  const [leagueId, setLeagueId] = useState<number>(-1);
  const [teamId, setTeamId] = useState<number>(-1);

  const [active, setActive] = useState(0);
  const handleLeagueId = (step: number) => {
    setActive(step);
  };

  const RightButton = () => {
    return <ConfirmModal />;
  };

  return (
    <Layout navigationTitle="대회 생성" navigationMenu={<RightButton />}>
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
        <Stepper.Step label="팀 선수">
          <LeagueTeamPlayers
            teamId={teamId}
            prevStep={() => handleLeagueId(1)}
          />
        </Stepper.Step>
      </Stepper>
    </Layout>
  );
}

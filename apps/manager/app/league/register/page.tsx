'use client';

import { Button, Group, Stepper } from '@mantine/core';
import { useState } from 'react';

import LeagueInfo from './_components/LeagueInfo';
import LeagueTeam from './_components/LeagueTeam';
import LeagueTeamPlayers from './_components/LeagueTeamPlayers';
import { stepperResolver } from './resolvers';

// import * as styles from './page.css';

export default function Register() {
  const [leagueId, setLeagueId] = useState<number>(-1);

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive(current => (current > 0 ? current - 1 : current));
  return (
    <>
      <Stepper active={active} vars={stepperResolver}>
        <Stepper.Step label="대회 정보">
          <LeagueInfo handleLeagueId={(id: number) => setLeagueId(id)} />
        </Stepper.Step>

        <Stepper.Step label="대회 팀">
          <LeagueTeam leagueId={leagueId} />
        </Stepper.Step>
        <Stepper.Step label="대회 로고">
          <LeagueTeamPlayers />
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
  // useFunnel 필요
}

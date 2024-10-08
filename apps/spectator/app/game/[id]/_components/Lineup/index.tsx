import { Accordion } from '@hcc/ui';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

import { useGameLineupById } from '@/queries/useGameLineupById';

import PlayerList from './PlayerList';
import * as styles from './styles.css';

type LineupProps = {
  gameId: string;
};

export default function Lineup({ gameId }: LineupProps) {
  const { data: lineups } = useGameLineupById(gameId);
  const [homeTeam, awayTeam] = lineups;

  return (
    <Fragment>
      <div className={clsx(styles.container, styles.starterContainer)}>
        <div className={styles.teamContainer}>
          <div className={styles.team.left}>
            <Image
              src={homeTeam.logoImageUrl}
              alt={`${homeTeam.teamName} logo image`}
              width={28}
              height={28}
              loading="lazy"
            />
            <span className={styles.teamName}>{homeTeam.teamName}</span>
          </div>

          <PlayerList
            players={homeTeam.starterPlayers}
            direction={homeTeam.direction}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.teamContainer}>
          <div className={styles.team.right}>
            <span className={styles.teamName} style={{ textAlign: 'end' }}>
              {awayTeam.teamName}
            </span>
            <Image
              src={awayTeam.logoImageUrl}
              alt={`${awayTeam.teamName} logo image`}
              width={28}
              height={28}
              loading="lazy"
            />
          </div>

          <PlayerList
            players={awayTeam.starterPlayers}
            direction={awayTeam.direction}
          />
        </div>
      </div>

      <Accordion type="single">
        <Accordion.Item value="candidate">
          <Accordion.Trigger className={styles.candidateButton} type="button">
            후보 선수 보기
          </Accordion.Trigger>
          <Accordion.Content>
            <div className={clsx(styles.container, styles.candidateContainer)}>
              <PlayerList
                players={homeTeam.candidatePlayers}
                direction={homeTeam.direction}
              />
              <div className={styles.divider} />
              <PlayerList
                players={awayTeam.candidatePlayers}
                direction={awayTeam.direction}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
}

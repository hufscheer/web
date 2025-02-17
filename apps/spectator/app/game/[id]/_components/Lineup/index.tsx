import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@hcc/ui';
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
            <div className={styles.logoContainer}>
              <Image
                src={homeTeam.logoImageUrl}
                alt={`${homeTeam.teamName} logo image`}
                loading="lazy"
                fill
                className={styles.logoImg}
              />
            </div>
            <span className={styles.teamName.left}>{homeTeam.teamName}</span>
          </div>

          <PlayerList
            players={homeTeam.starterPlayers}
            direction={homeTeam.direction}
          />
        </div>

        <div className={styles.divider} />

        <div className={styles.teamContainer}>
          <div className={styles.team.right}>
            <span className={styles.teamName.right}>{awayTeam.teamName}</span>
            <div className={styles.logoContainer}>
              <Image
                src={awayTeam.logoImageUrl}
                alt={`${awayTeam.teamName} logo image`}
                loading="lazy"
                fill
                className={styles.logoImg}
              />
            </div>
          </div>

          <PlayerList
            players={awayTeam.starterPlayers}
            direction={awayTeam.direction}
          />
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="candidate">
          <AccordionTrigger className={styles.candidateButton}>
            후보 선수 보기
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
}

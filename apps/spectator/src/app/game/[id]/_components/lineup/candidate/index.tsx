import { useGame, useSuspenseGameLineup } from '@hcc/api';
import { TradeIcon } from '@hcc/icons';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Icon } from '@hcc/ui';
import { clsx } from 'clsx';
import { Fragment } from 'react';

import * as styles from './styles.css';
import { TeamAria } from '../team-aria';

type CandidateProps = {
  gameId: string;
};

export const Candidate = ({ gameId }: CandidateProps) => {
  const { data: lineupData } = useSuspenseGameLineup(gameId);
  const { data: gameData } = useGame(gameId);

  const teams = gameData.gameTeams;

  return (
    <Fragment>
      <div className={styles.root}>
        {teams.map((team, index) => (
          <div
            key={team.gameTeamId}
            className={clsx(index === 1 && styles.awayTeamContainer, styles.container)}
          >
            <TeamAria team={team} />

            {lineupData[index].candidatePlayers
              .filter((player) => player.isReplaced)
              .map((player) => (
                <div key={player.id} className={styles.playerRow}>
                  <span className={styles.playerNumber}>{player.number}</span>
                  <div className={styles.replacedPlayerContainer}>
                    <span className={styles.playerName}>{player.playerName}</span>
                    <span className={styles.replacedPlayer}>
                      <Icon source={TradeIcon} size={12} />
                      {player.replacedPlayer?.playerName}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ))}
        <div className={styles.divider} aria-hidden />
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="candidate">
          <AccordionTrigger className={styles.candidateButton}>후보선수 보기</AccordionTrigger>
          <AccordionContent>
            <div className={styles.root}>
              {teams.map((team, index) => (
                <div
                  key={team.gameTeamId}
                  className={clsx(index === 1 && styles.awayTeamContainer, styles.container)}
                >
                  {lineupData[index].candidatePlayers
                    .filter((player) => !player.isReplaced)
                    .map((player) => (
                      <div key={player.id} className={styles.playerRow}>
                        <span className={styles.playerNumber}>{player.number}</span>
                        <span className={styles.playerName}>{player.playerName}</span>
                      </div>
                    ))}
                </div>
              ))}
              <div className={styles.divider} aria-hidden />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Fragment>
  );
};

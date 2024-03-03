import Image from 'next/image';

import { GameTeamType } from '@/types/game';

import * as styles from './Lineup.css';

type LineupTeamProps = {
  team: GameTeamType;
};

export default function LineupTeam({ team }: LineupTeamProps) {
  return (
    <div className={styles.team.root}>
      <Image
        src={team.logoImageUrl}
        alt={`${team.gameTeamName} logo image`}
        width={50}
        height={50}
        priority={true}
      />
      <span className={styles.team.name}>{team.gameTeamName}</span>
    </div>
  );
}

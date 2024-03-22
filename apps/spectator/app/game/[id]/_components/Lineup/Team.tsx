import Image from 'next/image';

import * as styles from './Lineup.css';

type LineupTeamProps = {
  gameTeamName: string;
  logoImageUrl: string;
};

export default function LineupTeam({
  gameTeamName,
  logoImageUrl,
}: LineupTeamProps) {
  return (
    <div className={styles.team.root}>
      <Image
        src={logoImageUrl}
        alt={`${gameTeamName} logo image`}
        width={50}
        height={50}
        loading="lazy"
      />
      <span className={styles.team.name}>{gameTeamName}</span>
    </div>
  );
}

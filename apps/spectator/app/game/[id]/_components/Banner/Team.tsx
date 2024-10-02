import Image from 'next/image';

import { GameTeamType } from '@/types/game';

import * as styles from './Banner.css';

type BannerTeamProps = {
  team: GameTeamType;
};

export default function BannerTeam({ team }: BannerTeamProps) {
  return (
    <div className={styles.team}>
      <Image
        src={team.logoImageUrl}
        alt={`${team.gameTeamName} logo image`}
        width={66}
        height={66}
        priority={true}
        className={styles.logo}
      />
      <strong className={styles.teamName}>{team.gameTeamName}</strong>
    </div>
  );
}

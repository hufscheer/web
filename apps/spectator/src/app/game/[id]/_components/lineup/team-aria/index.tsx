import { GameTeamType } from '@hcc/api';
import { clsx } from 'clsx';
import Image from 'next/image';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

type TeamAriaProps = {
  team: GameTeamType;
} & ComponentProps<'div'>;

export const TeamAria = ({ team, className, ...props }: TeamAriaProps) => {
  return (
    <div className={clsx(className, styles.root)} {...props}>
      <div className={styles.logo}>
        <Image
          src={team.logoImageUrl}
          alt={`${team.gameTeamName} 로고`}
          draggable={false}
          sizes="(max-width: 768px) 100px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 160px"
          fill
        />
      </div>
      <p className={styles.teamName}>{team.gameTeamName}</p>
    </div>
  );
};

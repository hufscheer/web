import { ProfileIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Image from 'next/image';

import { useMatchCardContext } from '@/hooks/useMatchCardContext';

import * as styles from './Team.css';

type TeamProps = {
  teamIndex: number;
  className?: string;
};

export default function Team({ teamIndex, className }: TeamProps) {
  const { gameTeams } = useMatchCardContext();

  if (gameTeams.length === 0) {
    return (
      <div className={className}>
        <Icon source={ProfileIcon} className={styles.teamLogoDefault} />
      </div>
    );
  }

  const targetTeamInfo = gameTeams[teamIndex - 1];

  return (
    <div className={className}>
      <Image
        width="65"
        height="65"
        src={targetTeamInfo.logoImageUrl}
        alt={`${targetTeamInfo.gameTeamName}팀 로고`}
      />
      <span>{targetTeamInfo.gameTeamName}</span>
    </div>
  );
}

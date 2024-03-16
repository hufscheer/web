import { CaretDownIcon, SubtractIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';

import * as styles from './ActionIcon.css';

type LeagueTeamActionIconProps = {
  edit: boolean;
};

export default function LeagueTeamActionIcon({
  edit,
}: LeagueTeamActionIconProps) {
  if (edit) {
    return (
      <Icon color="error" source={SubtractIcon} aria-label="대회 팀 삭제" />
    );
  }

  return (
    <Icon
      source={CaretDownIcon}
      className={styles.caretIcon}
      aria-label="대회 팀 관리"
    />
  );
}

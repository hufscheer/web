import { SportsType } from '@/types/league';

import { Icon } from '@/components/common/Icon';
import { QUERY_PARAMS } from '@/constants/queryParams';

import * as styles from './SportsList.css';

type SportsListProps = {
  selectedId: string[];
  sportsList: SportsType[];
  onClick: (key: string, value: string) => void;
};

export default function SportsList({
  selectedId = [],
  sportsList,
  onClick,
}: SportsListProps) {
  return (
    <ul className={styles.sportsList.wrapper}>
      {sportsList.map(sports => (
        <li
          key={sports.sportId}
          className={
            selectedId.includes(sports.sportId + '')
              ? styles.sportsList.itemFocused
              : styles.sportsList.item
          }
        >
          <button
            onClick={() => onClick(QUERY_PARAMS.sports, String(sports.sportId))}
            className={styles.sportsList.button}
          >
            <span>{sports.name}</span>
            {selectedId.includes(sports.sportId + '') && (
              <Icon iconName="cross" width="12" height="12" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

SportsList.Skeleton = function Skeleton() {
  return (
    <ul className={styles.skeleton.ul}>
      <li className={styles.skeleton.li} />
      <li className={styles.skeleton.li} />
      <li className={styles.skeleton.li} />
      <li className={styles.skeleton.li} />
    </ul>
  );
};

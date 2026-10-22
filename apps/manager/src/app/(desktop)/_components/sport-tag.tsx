import type { SportType } from '~/api';

import { BasketballIcon, SportsAndOutdoorsIcon } from '~/app/(desktop)/_components/icons';
import { SPORT_COLOR, SPORT_COLOR_SOFT } from '~/app/(desktop)/_constants/sports';
import { getSportConfig } from '~/constants/sports';

export const SportIcon = ({
  sportType,
  size = 14,
  className,
  colored,
}: {
  sportType: SportType;
  size?: number;
  className?: string;
  colored?: boolean;
}) => {
  const style = colored ? { color: SPORT_COLOR[sportType] } : undefined;
  const cls = className ?? `shrink-0 ${colored ? '' : 'text-[var(--color-neutral-400)]'}`;

  return sportType === 'SOCCER' ? (
    <SportsAndOutdoorsIcon size={size} className={cls} style={style} />
  ) : (
    <BasketballIcon size={size} className={cls} style={style} />
  );
};

export const SportTag = ({ sportType, soft }: { sportType: SportType; soft?: boolean }) => (
  <span
    className={
      soft
        ? 'text-t7 inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] px-2 py-0.5 font-semibold'
        : 'inline-flex items-center gap-1.5 font-medium'
    }
    style={{
      color: SPORT_COLOR[sportType],
      ...(soft ? { backgroundColor: SPORT_COLOR_SOFT[sportType] } : {}),
    }}
  >
    <SportIcon sportType={sportType} size={13} colored />
    {getSportConfig(sportType).label}
  </span>
);

import { CalendarMonthIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';

import type { SportType } from '~/api/types';

import { routes } from '~/constants/routes';

export const CalendarMenu = ({ sport }: { sport: SportType }) => (
  <Typography weight="semibold" asChild>
    <Link href={routes.calendar({ sport })}>
      <CalendarMonthIcon size={24} />
    </Link>
  </Typography>
);

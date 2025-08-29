import { CalendarMonthIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';
import { routes } from '~/constants/routes';

export const CalendarMenu = () => (
  <Typography weight="semibold" asChild>
    <Link href={`/${routes.calendar}`}>
      <CalendarMonthIcon size={24} />
    </Link>
  </Typography>
);

'use client';

import { CalendarMonthIcon } from '@hcc/icons';
import { Typography } from '@hcc/ui';
import Link from 'next/link';

import type { SportType } from '~/api/types';

import { routes } from '~/constants/routes';
import { useOrganizationId } from '~/hooks/useOrganizationId';

export const CalendarMenu = ({ sport }: { sport: SportType }) => {
  const { organizationId } = useOrganizationId();
  return (
    <Typography weight="semibold" asChild>
      <Link href={routes.calendar({ orgId: organizationId, sport })}>
        <CalendarMonthIcon size={24} />
      </Link>
    </Typography>
  );
};

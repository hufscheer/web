'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

export const useOrganizationId = () => {
  const [organizationId, setOrganizationId] = useQueryState(
    'organizationId',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false }),
  );

  return { organizationId, setOrganizationId };
};

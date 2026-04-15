'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

export const useOrganizationId = () => {
  const [organizationId, setOrganizationId] = useQueryState(
    'organizationId',
    parseAsInteger.withOptions({ clearOnDefault: false }),
  );

  return { organizationId, setOrganizationId };
};

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { abandonOrgSession } from '~/utils/org-session';

export const OrgGuard = () => {
  const router = useRouter();
  const result = useOrganizationId();
  const { data: organizations } = useSuspenseOrganizations();

  useEffect(() => {
    if (!result.isReady) return;
    const exists = organizations.some((org) => org.id === result.organizationId);

    if (exists) return;
    abandonOrgSession(router);
  }, [result, organizations, router]);

  return null;
};

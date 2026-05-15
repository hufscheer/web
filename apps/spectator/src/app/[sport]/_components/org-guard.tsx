'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { abandonOrgSession } from '~/utils/org-session';

export const OrgGuard = () => {
  const router = useRouter();
  const { isReady, organizationId } = useOrganizationId();
  const { data: organizations } = useSuspenseOrganizations();

  useEffect(() => {
    if (!isReady) return;
    const exists = organizations.some((org) => org.id === organizationId);

    if (exists) return;
    abandonOrgSession(router);
  }, [isReady, organizationId, organizations, router]);

  return null;
};

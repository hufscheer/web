'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { useOrganizationId } from '~/hooks/useOrganizationId';
import { abandonOrgSession, writeOrgCookie } from '~/utils/org-session';

export const OrgGuard = () => {
  const router = useRouter();
  const { organizationId } = useOrganizationId();
  const { data: organizations } = useSuspenseOrganizations();

  useEffect(() => {
    const exists = organizations.some((org) => org.id === organizationId);

    if (exists) {
      // 공유 링크로 바로 들어와도 다음에 `/` 로 오면 이 학교로 돌아오게 한다. proxy 가 이 경로에서 돌지 않아 여기서 쓴다
      writeOrgCookie(organizationId);
      return;
    }
    abandonOrgSession(router);
  }, [organizationId, organizations, router]);

  return null;
};

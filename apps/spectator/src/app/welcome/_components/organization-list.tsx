import { ErrorIcon } from '@hcc/icons';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useSuspenseOrganizations } from '~/api';
import { RadioCard } from '~/components/radio-card';
import { Skeleton } from '~/components/skeleton';
import { readOrgCookie } from '~/utils/org-session';

import { OrganizationCard } from './organization-card';

const URL_KEY = 'org';

interface OrganizationListProps {
  selectedId: number | null;
  handleSelectedId: (id: number) => void;
}

export const OrganizationList = ({ selectedId, handleSelectedId }: OrganizationListProps) => {
  const { data: organizations } = useSuspenseOrganizations();
  const knownIds = useMemo(() => new Set(organizations.map((o) => o.id)), [organizations]);

  const searchParams = useSearchParams();

  useEffect(() => {
    // URL 우선
    const rawUrl = searchParams.get(URL_KEY);
    const fromUrl = rawUrl === null ? Number.NaN : Number(rawUrl);
    if (Number.isInteger(fromUrl) && knownIds.has(fromUrl)) {
      handleSelectedId(fromUrl);
      return;
    }

    // 다음 쿠키
    const fromCookie = readOrgCookie();
    if (fromCookie !== null && knownIds.has(fromCookie)) {
      handleSelectedId(fromCookie);
    }

    // 선택 상태 초기화는 마운트 시 한 번만 수행. searchParams가 바뀌어도 이미 선택한 값을 덮어쓰지 않는다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knownIds]);

  return (
    <RadioCard.Group
      aria-label="응원할 학교 선택"
      value={selectedId}
      onValueChange={handleSelectedId}
      className="py-5"
    >
      {organizations.map((org) => (
        <OrganizationCard key={org.id} {...org} />
      ))}
    </RadioCard.Group>
  );
};

const OrganizationListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
};

const OrganizationListError = () => {
  return (
    <div className="flex flex-col items-center gap-2.5 py-5">
      <div className="text-sm text-neutral-400">
        조직 정보를 불러오지 못했어요. <ErrorIcon />
      </div>
    </div>
  );
};

OrganizationList.Skeleton = OrganizationListSkeleton;
OrganizationList.Error = OrganizationListError;

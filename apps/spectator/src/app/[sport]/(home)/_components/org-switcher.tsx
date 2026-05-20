'use client';

import { CaretRightIcon, CloseIcon } from '@hcc/icons';
import { BottomSheet, Button } from '@hcc/ui';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import Image from 'next/image';
import { startTransition, useMemo, useState } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { RadioCard } from '~/components/radio-card';
import { Skeleton } from '~/components/skeleton';
import { useOrganizationId } from '~/hooks/useOrganizationId';

export const OrgName = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId } = useOrganizationId();

  const currentOrg = useMemo(
    () => organizations.find((o) => o.id === organizationId),
    [organizations, organizationId],
  );

  return <span>{currentOrg?.name ?? '—'}</span>;
};

export const OrgSwitcher = () => {
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);

  // middleware로 보호되므로 사실상 항상 isReady=true
  const { isReady, organizationId, setOrganizationId } = useOrganizationId();
  if (!isReady) return null;

  const handleConfirm = () => {
    if (selectedOrg === null) return;

    startTransition(async () => {
      await setOrganizationId(selectedOrg, { scroll: false, history: 'replace' });
    });
  };

  const handleClose = () => {
    setSelectedOrg(null);
  };

  return (
    <BottomSheet onClose={handleClose}>
      <BottomSheet.Trigger className="inline-flex items-center truncate rounded-full border border-[#BEDDFF] px-3 py-1 text-xs leading-[1.5] font-medium tracking-[0%] text-[#BEDDFF] transition-colors hover:bg-(--color-primary-50)">
        학교 변경
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <BottomSheet.Header className="!flex flex-row items-start justify-between !px-5">
          <BottomSheet.Title>응원할 학교를 선택해주세요</BottomSheet.Title>

          <BottomSheet.Close>
            <CloseIcon width={24} height={24} />
          </BottomSheet.Close>
        </BottomSheet.Header>

        <ErrorBoundary fallback={null}>
          <Suspense fallback={<OrganizationListSkeleton />}>
            <OrganizationList
              currentId={organizationId}
              selectedOrg={selectedOrg}
              handleSelectedOrg={setSelectedOrg}
            />
          </Suspense>
        </ErrorBoundary>

        <BottomSheet.Footer>
          <BottomSheet.Close asChild>
            <Button type="button" disabled={selectedOrg === null} onClick={handleConfirm}>
              선택완료
            </Button>
          </BottomSheet.Close>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

interface OrganizationListProps {
  currentId: number;
  selectedOrg: number | null;
  handleSelectedOrg: (org: number) => void;
}

const OrganizationList = ({ currentId, selectedOrg, handleSelectedOrg }: OrganizationListProps) => {
  const { data: organizations } = useSuspenseOrganizations();

  const alternatives = useMemo(
    () => organizations.filter((o) => o.id !== currentId),
    [organizations, currentId],
  );

  return (
    <RadioCard.Group value={selectedOrg} onValueChange={handleSelectedOrg} className="px-5">
      {alternatives.map(({ id, name, logoImageUrl, isLeagueOngoing }) => (
        <RadioCard.Root value={id} key={id}>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={logoImageUrl ?? '/images/fallback-image.webp'}
                width={36}
                height={36}
                alt={`${name} 로고`}
                className="size-9 shrink-0 rounded-full object-contain"
              />

              <span className="truncate text-xs leading-[1.5] font-semibold tracking-[0%] text-neutral-400 in-data-checked:text-[var(--color-primary-600)]">
                {name}
              </span>
            </div>

            <div className="flex items-center rounded-full bg-neutral-200 px-3 py-1 text-xs leading-[1.5] font-semibold tracking-[0%] text-neutral-400 in-data-checked:bg-[var(--color-primary-600)] in-data-checked:text-white">
              {isLeagueOngoing ? '대회 진행 중' : '대회 진행 예정'}
              <CaretRightIcon />
            </div>
          </div>
        </RadioCard.Root>
      ))}
    </RadioCard.Group>
  );
};

export const OrganizationListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
};

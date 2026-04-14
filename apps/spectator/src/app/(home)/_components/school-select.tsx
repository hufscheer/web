'use client';

import { startTransition, Suspense } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { Select } from '~/components/ui/select';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId, setOrganizationId } = useOrganizationId();

  const options = organizations.map((org) => ({ value: org.id, label: org.name }));
  const selectedId = organizationId ?? organizations[0]?.id;

  const handleChange = (id: number) => {
    startTransition(() => {
      setOrganizationId(id, { scroll: false, history: 'replace' });
    });
  };

  if (selectedId === undefined) return null;

  return <Select value={selectedId} onChange={handleChange} options={options} />;
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="animate-pulse rounded-xl bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);

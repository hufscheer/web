'use client';

import { startTransition, Suspense } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { Select } from '~/components/ui/select';
import { useOrganizationId } from '~/hooks/useOrganizationId';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId, setOrganizationId } = useOrganizationId();

  const options = organizations.map((org) => ({ value: org.id, label: org.name }));

  const handleChange = (id: number) => {
    startTransition(async () => {
      await setOrganizationId(id, { scroll: false, history: 'replace' });
    });
  };

  return <Select value={organizationId} onChange={handleChange} options={options} />;
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="animate-pulse rounded-xl bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);

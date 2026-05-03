'use client';

import { Suspense } from 'react';

import { useSuspenseOrganizations } from '~/api/queries/useOrganizations';
import { Select } from '~/components/ui/select';
import { useOrganizations } from '~/stores/use-organization';

const SchoolSelectContent = () => {
  const { data: organizations } = useSuspenseOrganizations();
  const { organizationId, setOrganization } = useOrganizations();

  const options = organizations.map((org) => ({ value: org.id, label: org.name }));
  const isValidId = options.some((opt) => opt.value === organizationId);
  const selectedId = isValidId ? organizationId : undefined;

  return (
    <Select value={selectedId ?? 2} onChange={(id) => setOrganization(id)} options={options} />
  );
};

export const SchoolSelect = () => (
  <Suspense fallback={<div className="animate-pulse rounded-xl bg-neutral-100" />}>
    <SchoolSelectContent />
  </Suspense>
);

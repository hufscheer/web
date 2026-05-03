import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { OrganizationType } from '~/api';

type OrganizationId = OrganizationType['id'];

interface OrganizationState {
  organizationId: OrganizationId;
  setOrganization: (organizationId: OrganizationId) => void;
}

const DEFAULT_ORGANIZATION_ID = 2;

export const useOrganizations = create<OrganizationState>()(
  persist(
    (set) => ({
      organizationId: DEFAULT_ORGANIZATION_ID,
      setOrganization: (organizationId) => set({ organizationId }),
    }),
    {
      name: 'hcc-organization',
      version: 1,
    },
  ),
);

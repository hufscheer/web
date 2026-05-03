import { create } from 'zustand';

import type { OrganizationType } from '~/api';

interface OrganizationState {
  organization: OrganizationType;
  setOrganization: (organization: OrganizationType) => void;
}

export const useOrganizations = create<OrganizationState>((set) => ({
  organization: {} as OrganizationType,
  setOrganization: (organization) => set({ organization }),
}));

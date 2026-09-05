'use client';

import { createContext, useContext, type ReactNode, type RefObject } from 'react';

type PortalContainer = RefObject<HTMLElement | null> | null;

const PortalContainerContext = createContext<PortalContainer>(null);

export const PortalContainerProvider = ({
  container,
  children,
}: {
  container: PortalContainer;
  children: ReactNode;
}) => (
  <PortalContainerContext.Provider value={container}>{children}</PortalContainerContext.Provider>
);

export const usePortalContainer = () => useContext(PortalContainerContext);

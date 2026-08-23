'use client';

import { type ComponentType, type LazyExoticComponent, useCallback, useState } from 'react';

export type TimelineSheetProps = {
  leagueId: number;
  gameId: number;
  onClose: () => void;
};

export type TimelineSheetEntry = {
  title: string;
  Component: LazyExoticComponent<ComponentType<TimelineSheetProps>>;
};

export type TimelineSheetRegistry<T extends string> = Record<T, TimelineSheetEntry>;

export function useTimelineSheet<T extends string>(registry: TimelineSheetRegistry<T>) {
  const [type, setType] = useState<T | null>(null);
  const close = useCallback(() => setType(null), []);
  const active = type ? registry[type] : null;

  return {
    type,
    active,
    isOpen: type !== null,
    open: setType,
    close,
  };
}

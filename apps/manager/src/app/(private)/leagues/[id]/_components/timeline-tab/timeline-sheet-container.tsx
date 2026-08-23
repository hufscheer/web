'use client';

import { Spinner } from '@hcc/ui';
import { type ReactNode, Suspense } from 'react';
import { Drawer } from 'vaul';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | null;
  children: ReactNode;
};

export function TimelineSheetContainer({ open, onOpenChange, title, children }: Props) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mt-24 flex h-[90%] flex-col rounded-t-lg bg-white">
          <div className="flex-1 rounded-t-lg">
            <div className="mx-auto my-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            {title && (
              <Drawer.Title className="mb-4 px-5 text-start text-2xl font-semibold">
                {title}
              </Drawer.Title>
            )}
            <div className="h-full overflow-y-auto">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                }
              >
                {children}
              </Suspense>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

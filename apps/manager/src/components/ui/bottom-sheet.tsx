'use client';

import React, { type ComponentProps } from 'react';
import { Drawer } from 'vaul';

type BottomSheetProps = ComponentProps<typeof Drawer.Root> & {
  title: string;
};

export const BottomSheet = ({ children, title, ...props }: BottomSheetProps) => {
  const childrenArray = React.Children.toArray(children);

  const trigger = childrenArray[0];
  const content = childrenArray[1];

  return (
    <Drawer.Root {...props}>
      {trigger}

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex flex-col rounded-t-[10px] bg-white">
          <div className="flex-1 rounded-t-[10px] p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Drawer.Title className="mb-4 text-center font-semibold text-lg">{title}</Drawer.Title>
            {content}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

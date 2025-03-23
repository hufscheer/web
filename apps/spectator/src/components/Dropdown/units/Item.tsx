'use client';

import { ComponentProps, MouseEvent } from 'react';

interface DropdownItemProps extends ComponentProps<'button'> {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Item({ children, ...props }: DropdownItemProps) {
  return <button {...props}>{children}</button>;
}

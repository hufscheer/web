import { Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

export default function LinkButton({
  href,
  variant = 'light',
  children,
}: LinkButtonProps) {
  return (
    <Button component={Link} variant={variant} href={href}>
      {children}
    </Button>
  );
}

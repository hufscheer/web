import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import Card from '@/components/Card';

type GameCardProps = {
  href: string;
  children: React.ReactNode;
};

export default function GameCard({ href, children }: GameCardProps) {
  return (
    <Card.Root>
      <Card.Content
        flex={1}
        justify="space-between"
        component={Link}
        href={href}
      >
        <Card.Title>{children}</Card.Title>
        <Card.Action>
          <Icon source={CaretDownIcon} transform="rotate(-90)" />
        </Card.Action>
      </Card.Content>
    </Card.Root>
  );
}

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import Card from '@/components/Card';

type LeagueMenuCardProps = {
  href: string;
  title: string;
};

export default function LeagueMenuCard({ href, title }: LeagueMenuCardProps) {
  return (
    <Card.Root paddingVertical="sm">
      <Card.Content component={Link} href={href}>
        <Card.Title text="semibold" style={{ flex: 1 }}>
          {title}
        </Card.Title>
        <Card.Action>
          <Icon
            source={CaretDownIcon}
            style={{ transform: 'rotate(-90deg)' }}
          />
        </Card.Action>
      </Card.Content>
    </Card.Root>
  );
}

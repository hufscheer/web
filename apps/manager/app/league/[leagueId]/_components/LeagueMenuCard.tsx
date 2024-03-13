import { CaretDownIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
import { Icon } from '@hcc/ui';
import Link from 'next/link';

import Card from '@/components/Card';

type LeagueMenuCardProps = {
  href: string;
  title: string;
  marginTop?: number;
};

export default function LeagueMenuCard({
  href,
  title,
  marginTop = 12,
}: LeagueMenuCardProps) {
  return (
    <Link href={href} style={{ marginTop: rem(marginTop) }}>
      <Card.Root paddingVertical="sm">
        <Card.Content>
          <div style={{ flex: 1 }}>
            <Card.Title text="semibold">{title}</Card.Title>
          </div>
          <Card.Action>
            <Icon
              source={CaretDownIcon}
              style={{ transform: 'rotate(-90deg)' }}
            />
          </Card.Action>
        </Card.Content>
      </Card.Root>
    </Link>
  );
}

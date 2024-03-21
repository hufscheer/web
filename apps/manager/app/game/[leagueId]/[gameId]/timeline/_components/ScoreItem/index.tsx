import { CaretDownIcon, SoccerIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Flex } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Card from '@/components/Card';
import { GenericRecordType } from '@/types/game';

type ScoreItemProps = {
  quarter: string;
} & GenericRecordType<'SCORE'>;

export default function ScoreItem({ quarter, ...record }: ScoreItemProps) {
  const pathname = usePathname();

  return (
    <li>
      <Card.Root>
        <Card.Content component={Link} href={`${pathname}${record.recordId}`}>
          <Flex>
            <Flex direction="column">
              <Card.Title>{record.playerName}</Card.Title>
              <Card.SubContent>
                {quarter} ′{record.recordedAt}
              </Card.SubContent>
            </Flex>
            <Flex>
              <Image
                src={record.teamImageUrl}
                alt={`${record.teamName} logo`}
                width={24}
                height={24}
              />
              <Icon source={SoccerIcon} />
            </Flex>
          </Flex>
          <Card.Action>
            <Icon source={CaretDownIcon} rotate="-90deg" />
          </Card.Action>
        </Card.Content>
      </Card.Root>
    </li>
  );
}

import { CaretDownIcon, SoccerIcon } from '@hcc/icons';
import { rem } from '@hcc/styles';
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
        <Card.Content
          component={Link}
          href={`${pathname}update/${record.recordId}`}
        >
          <Flex w="100%" justify="space-between" align="center">
            <Flex direction="column" gap={rem(4)}>
              <Card.Title text="semibold">{record.playerName}</Card.Title>
              <Card.SubContent>
                {quarter} ′{record.recordedAt}
              </Card.SubContent>
            </Flex>
            <Flex gap="xs" align="center">
              <Image
                src={record.teamImageUrl}
                alt={`${record.teamName} logo`}
                width={24}
                height={24}
              />
              <Icon source={SoccerIcon} />
              <Card.Action>
                <Icon source={CaretDownIcon} transform="rotate(-90)" />
              </Card.Action>
            </Flex>
          </Flex>
        </Card.Content>
      </Card.Root>
    </li>
  );
}

'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex, rem, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { BLOCKED_CAPTION, PENDING_CAPTION } from '@/constants/reportCaption';

import CheerTalkCard from './_components/CheerTalkCard';

export default function Page() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Flex h={rem(43)} align="center">
        <Button pos="absolute" p={0} bg="none" onClick={() => router.back()}>
          <Icon source={CaretDownIcon} style={{ transform: 'rotate(90deg)' }} />
        </Button>
        <Text flex={1} ta="center" size="md" fw="bold">
          응원톡 관리
        </Text>
      </Flex>
      <CheerTalkCard type="pending" caption={PENDING_CAPTION} />
      <CheerTalkCard type="isBlocked" caption={BLOCKED_CAPTION} />
    </div>
  );
}

'use client';

import { CaretDownIcon } from '@hcc/icons';
import { Icon } from '@hcc/ui';
import { Button, Flex, rem, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

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

      <CheerTalkCard
        type="pending"
        caption="보류된 응원톡은 신고되었으나 욕설이나 부적절한 단어가 발견되지 않은 댓글입니다. 해당 응원톡은 개별적으로 차단할 수 있습니다."
      />
      <CheerTalkCard
        type="isBlocked"
        caption="차단된 응원톡은 부적절한 단어가 포함되어 자동 차단됐거나 보류 상태에서 감춰진 내용입니다. 차단된 응원톡은 복구할 수 있습니다."
      />
    </div>
  );
}

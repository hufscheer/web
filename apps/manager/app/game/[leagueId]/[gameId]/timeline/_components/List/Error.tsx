import { Button, Flex, Text } from '@mantine/core';

import { FallbackProps } from '@/components/ErrorBoundary';

export default function TimelineError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <Flex direction="column" gap="sm">
      <Text>{error?.message}</Text>
      <Button onClick={resetErrorBoundary}>다시 시도하기</Button>
    </Flex>
  );
}

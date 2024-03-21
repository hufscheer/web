import { Flex, Loader, LoadingOverlay } from '@mantine/core';

import Layout from '@/components/Layout';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Layout>
      <Flex justify="center" align="center">
        <LoadingOverlay />
        <Loader ta="center" />
      </Flex>
    </Layout>
  );
}

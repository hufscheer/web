import { Spinner } from '@hcc/ui';

import Layout from '@/components/Layout';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Layout>
      <Spinner />
    </Layout>
  );
}

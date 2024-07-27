'use client';
import Layout from '@/components/Layout';

import CheerTalkList from '../_components/CheerTalkList';

export default function Page() {
  return (
    <Layout navigationTitle="가린 응원톡 관리">
      <CheerTalkList type="blockedUnhideFeature" />
    </Layout>
  );
}

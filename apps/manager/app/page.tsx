import Link from 'next/link';

import Layout from '@/components/Layout';

export default function Page() {
  return (
    <Layout navigationVisible={false}>
      <Link
        href={{ pathname: '/login', query: { redirectPath: 'redirectUrl' } }}
      >
        로그인 페이지로
      </Link>
    </Layout>
  );
}

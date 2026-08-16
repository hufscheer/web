import { redirect } from 'next/navigation';

/**
 * 미들웨어가 항상 `/org/[orgId]/...` 또는 `/welcome` 으로 리다이렉트한다.
 * 이 경로가 실제로 렌더링되는 경우는 없지만 방어적으로 `/welcome` 으로 보낸다.
 */
const Page = () => {
  redirect('/welcome');
};

export default Page;

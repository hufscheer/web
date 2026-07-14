import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../_constants';

type Props = {
  params: Promise<{ orgId: string }>;
};

const Page = async ({ params }: Props) => {
  const { orgId } = await params;
  redirect(routes.home({ orgId: Number(orgId), sport: SPORT_TYPE }));
};

export default Page;

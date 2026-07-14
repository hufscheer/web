import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT } from '~/utils/sport-route';

type Props = {
  params: Promise<{ orgId: string }>;
};

const Page = async ({ params }: Props) => {
  const { orgId } = await params;

  redirect(routes.home({ orgId: Number(orgId), sport: DEFAULT_SPORT }));
};

export default Page;

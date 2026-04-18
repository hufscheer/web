import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

type Props = {
  searchParams: Promise<{ sport?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport } = await searchParams;
  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(routes.home({ sport: sportType }));
};

export default Page;

import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

type Props = {
  searchParams: Promise<{ sport?: string; org?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport, org } = await searchParams;
  const parsed = org ? Number(org) : Number.NaN;
  const isValid = Number.isInteger(parsed) && parsed > 0;

  if (!isValid) {
    redirect('/welcome');
  }

  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(`${routes.home({ sport: sportType })}?org=${parsed}`);
};

export default Page;

import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT, normalizeSportParam } from '~/utils/sport-route';

type Props = {
  searchParams: Promise<{ sport?: string; organizationId?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { sport, organizationId } = await searchParams;
  const parsed = organizationId ? Number(organizationId) : Number.NaN;
  const isValid = Number.isInteger(parsed) && parsed > 0;

  if (!isValid) {
    redirect('/welcome');
  }

  const sportType = normalizeSportParam(sport) ?? DEFAULT_SPORT;
  redirect(`${routes.home({ sport: sportType })}?organizationId=${parsed}`);
};

export default Page;

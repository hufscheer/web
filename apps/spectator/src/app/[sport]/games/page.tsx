import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';
import { DEFAULT_SPORT } from '~/utils/sport-route';

const Page = () => {
  redirect(routes.home({ sport: DEFAULT_SPORT }));
};

export default Page;

import { redirect } from 'next/navigation';

import { routes } from '~/constants/routes';

import { SPORT_TYPE } from '../_constants';

const Page = () => {
  redirect(routes.home({ sport: SPORT_TYPE }));
};

export default Page;

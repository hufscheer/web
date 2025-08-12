import { redirect } from 'next/navigation';
import { ROUTES } from '~/constants/routes';

const Page = () => {
  redirect(ROUTES.LOGIN);
};

export default Page;

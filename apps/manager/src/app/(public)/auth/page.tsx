import { redirect } from 'next/navigation';
import { routes } from '~/constants/routes';

const Page = () => {
  redirect(`/${routes.login}`);
};

export default Page;

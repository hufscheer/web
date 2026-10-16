import { redirect } from 'next/navigation';

import { routes } from '~/desktop/constants/routes';

export default function TeamsIndex() {
  redirect(routes.teams());
}

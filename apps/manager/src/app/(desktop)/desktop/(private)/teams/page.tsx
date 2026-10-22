import { redirect } from 'next/navigation';

import { routes } from '~/app/(desktop)/_constants/routes';

export default function TeamsIndex() {
  redirect(routes.teams());
}

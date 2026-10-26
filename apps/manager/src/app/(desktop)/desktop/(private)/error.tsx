'use client';

import { ErrorState } from '~/app/(desktop)/_components/error-state';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => (
  <ErrorState error={error} />
);

export default ErrorPage;

'use client';

import { ErrorState } from '~/components/error-state';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => (
  <ErrorState error={error} />
);

export default ErrorPage;

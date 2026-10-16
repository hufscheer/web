'use client';

import { ErrorState } from '~/desktop/components/error-state';

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => (
  <ErrorState error={error} />
);

export default ErrorPage;

import type { FieldErrors } from 'react-hook-form';

import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';

export const handleFormError = (errors: FieldErrors) => {
  const messages = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean);

  const [first, ...rest] = messages;
  const suffix = rest.length > 0 ? ` (외 ${rest.length}개의 오류)` : '';

  toast.error(`${first}${suffix}`);
};

export const parseHTTPError = async (error: unknown, fallback: string): Promise<string> => {
  if (error instanceof HTTPError) {
    const body = await error.response
      .json<{ message?: string }>()
      .catch((): { message?: string } => ({}));
    return body.message || fallback;
  }
  return fallback;
};

import { toast } from '@hcc/ui';
import type { FieldErrors } from 'react-hook-form';

export const handleFormError = (errors: FieldErrors) => {
  const messages = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean);

  const [first, ...rest] = messages;
  const suffix = rest.length > 0 ? ` (외 ${rest.length}개의 오류)` : '';

  toast.error(`${first}${suffix}`);
};

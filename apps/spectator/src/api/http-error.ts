import { toast } from '@hcc/ui';
import { HTTPError } from 'ky';

const DEFAULT_MESSAGE = '요청에 실패했어요. 다시 시도해 주세요';

type ErrorMessageFn = (status: number) => string | undefined;
type FallbackMessage = string | ErrorMessageFn;

const resolveMessage = (fallback: FallbackMessage, status: number) => {
  if (typeof fallback === 'function') return fallback(status);

  return fallback;
};

export const handleHTTPError = (error: Error, message: FallbackMessage) => {
  if (error instanceof HTTPError) {
    const status = error.response.status;
    const msg = resolveMessage(message, status);

    error.response
      .json<{ message?: string }>()
      .then((body) => toast.error(msg ?? body.message ?? DEFAULT_MESSAGE))
      .catch(() => toast.error(msg ?? DEFAULT_MESSAGE));
    return;
  }
};

import { HTTPError } from 'ky';

/** 화면에 그대로 보여도 되는 문구를 담은 에러. 그 밖의 에러는 대체 문구로 바꾼다 */
export class UserFacingError extends Error {}

export const parseHTTPError = async (error: unknown, fallback: string): Promise<string> => {
  if (error instanceof HTTPError) {
    const body = await error.response
      .json<{ message?: string }>()
      .catch((): { message?: string } => ({}));
    return body.message || fallback;
  }
  if (error instanceof UserFacingError) return error.message;
  return fallback;
};

const FILTER_KEYS = ['unblocked', 'reported', 'blocked'] as const;

/** `?filter=` 값 중 응원톡 화면이 아는 것만 받는다 */
export const parseCheerTalkFilter = (value: string | string[] | undefined) =>
  FILTER_KEYS.find((key) => key === value);

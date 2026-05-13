import type { CheerTalkListResponse, CheerTalkType } from '~/api';

export const flattenCheerTalkPages = (pages: CheerTalkListResponse[]): CheerTalkType[] => [
  ...new Map(pages.flatMap((p) => p.content).map((t) => [t.cheerTalkId, t])).values(),
];

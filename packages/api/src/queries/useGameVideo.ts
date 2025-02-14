import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';
import { NotFoundError } from '../utils';

export const useGameVideo = (gameId: string) => {
  const query = useSuspenseQuery(queryKeys.gameVideo(gameId));

  if (!query.data.videoId) {
    throw new NotFoundError('경기 하이라이트 영상을 준비중이에요.');
  }
  if (query.error) {
    throw query.error;
  }

  return query;
};

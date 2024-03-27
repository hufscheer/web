import { useSuspenseQuery } from '@tanstack/react-query';

import { getGameVideoById } from '@/api/game';
import { NotFoundError } from '@/services/errors';

export const VIDEO_QUERY_KEY = 'game-video';
export const useVideoQuery = (gameId: string) => {
  const query = useSuspenseQuery({
    queryKey: [VIDEO_QUERY_KEY, { gameId }],
    queryFn: () => getGameVideoById(gameId),
  });

  if (!query.data.videoId)
    throw new NotFoundError(
      '해당 경기의 하이라이트 영상 업데이트 준비 중입니다.',
    );
  if (query.error) throw query.error;

  return query;
};

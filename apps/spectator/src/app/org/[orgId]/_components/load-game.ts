import { HTTPError } from 'ky';
import { cache } from 'react';

import type { GameType } from '~/api';

import { fetchGame } from '~/api';

// 요청 단위로 캐시해 generateMetadata 와 Page 가 같은 경기를 한 번만 조회한다.
// 404 는 not-found 로 보내야 하므로 구분해서 돌려주고, 그 밖의 오류(네트워크, 5xx, 타임아웃)는
// ISR 페이지 전체가 500 이 되지 않게 null 로 삼켜 본문을 클라이언트가 가져오게 한다
export const loadGame = cache(
  async (gameId: number): Promise<GameType | 'not-found' | null> =>
    fetchGame({ gameId }).catch((error: unknown) =>
      error instanceof HTTPError && error.response.status === 404 ? 'not-found' : null,
    ),
);

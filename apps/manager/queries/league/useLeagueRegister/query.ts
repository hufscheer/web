import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import { getAllLeagues, getSportsCategories } from '@/api/league';
import { ADMIN_QUERY_KEY } from '@/constants/queryKey';

export default function useSportsList() {
  const { data, error } = useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEY.SPORTS_LIST],
    queryFn: () => getSportsCategories(),
  });

  return {
    data,
    error,
  };
}

export function useLeagueRegisterData() {
  // leagueRegisterFetcher에서 각 쿼리의 data를 지명해서 변수로 쓰고 싶은데, 아래와 같이 작성하면 array 데이터로 묶여서 사용하기 불편해짐
  // TODO: 복수 쿼리들의 결과값을 1:1 네이밍해 내보낼 수 있는 방법 찾기
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [ADMIN_QUERY_KEY.LEAGUE_LIST],
        queryFn: getAllLeagues,
      },
      {
        queryKey: [ADMIN_QUERY_KEY.SPORTS_LIST],
        queryFn: getSportsCategories,
      },
    ],
    combine: results => {
      return {
        data: results.map(result => result.data),
        error: results.some(result => result.error),
      };
    },
  });
}

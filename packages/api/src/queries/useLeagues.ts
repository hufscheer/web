import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKey';

const useLeagues = (year?: string) => useQuery(queryKeys.leagues(year));

export default useLeagues;

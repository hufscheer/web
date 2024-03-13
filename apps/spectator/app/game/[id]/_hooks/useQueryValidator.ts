import { useSearchParams } from 'next/navigation';

export default function useQueryValidator(
  queryKey: string,
  validValues: string[],
) {
  const searchParams = useSearchParams();
  const queryValue = searchParams.get(queryKey);

  if (queryValue) {
    if (validValues.includes(queryValue)) {
      return queryValue;
    }
  }

  return null;
}

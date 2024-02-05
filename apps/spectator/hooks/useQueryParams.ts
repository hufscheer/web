import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { MatchStatus } from '@/types/match';

export default function useQueryParams() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const appendToParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());
    const targetParams = newParams.getAll(key);

    if (targetParams.includes(value)) {
      newParams.delete(key, value);
    } else {
      newParams.append(key, value);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const setInParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (newParams.get(key) === value) return;

    newParams.set(key, value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  type StoreWithStatus<T> = T & { status: MatchStatus };

  const repeatIterator = <T extends { [key: string]: string | string[] }>(
    store: StoreWithStatus<T>,
    iterator: IterableIterator<[string, string]>,
  ): StoreWithStatus<T> => {
    const { value, done } = iterator.next();

    if (!done) {
      const [iterableKey, iterableValue] = value;

      if (iterableKey in store) {
        if (Array.isArray(store[iterableKey])) {
          (store[iterableKey] as string[]).push(iterableValue);
        } else {
          (store[iterableKey] as string[]) = [
            store[iterableKey] as string,
            iterableValue,
          ];
        }
      } else {
        (store[iterableKey] as string) = iterableValue as string;
      }

      return repeatIterator(store, iterator);
    }

    return store;
  };

  return { params, repeatIterator, appendToParams, setInParams };
}

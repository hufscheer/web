import { ComponentProps, Fragment, Key, ReactNode } from 'react';

interface ListProps<T> extends Omit<ComponentProps<'ul'>, 'key' | 'children'> {
  lists: T[];
  _key?: keyof T;
  children: (props: T) => ReactNode;
}

export default function List<T>({
  lists,
  _key,
  children,
  ...props
}: ListProps<T>) {
  if (!lists.length) {
    return null;
  }

  return (
    <ul {...props}>
      {lists.map(item => {
        const key = (_key ? item[_key] : item) as Key;

        return <Fragment key={key}>{children(item)}</Fragment>;
      })}
    </ul>
  );
}

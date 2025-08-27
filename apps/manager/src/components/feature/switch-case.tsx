import type { ReactElement } from 'react';

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, ReactElement | null>>;
  value: Case;
  defaultComponent?: ReactElement | null;
}

export const SwitchCase = <Case extends string | number>({
  value,
  caseBy,
  defaultComponent = null,
}: Props<Case>): ReactElement | null => {
  if (value == null) {
    return defaultComponent;
  }
  return caseBy[value] ?? defaultComponent;
};

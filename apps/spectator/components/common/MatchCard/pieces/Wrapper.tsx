import { clsx } from 'clsx';
import { createContext, ReactNode } from 'react';
import { MatchType } from '@/types/match';

import * as styles from './Wrapper.css';

type MatchProps = MatchType & {
  children: ReactNode;
  className?: string;
};

export const MatchContext = createContext<MatchType>({} as MatchType);

export default function MatchWrapper({
  children,
  className,
  ...props
}: MatchProps) {
  return (
    <MatchContext.Provider value={props}>
      <div className={clsx(className, styles.matchContext)}>{children}</div>
    </MatchContext.Provider>
  );
}

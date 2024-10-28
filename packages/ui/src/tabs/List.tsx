import { clsx } from 'clsx';
import { ReactNode } from 'react';

import useTabs from './hooks';
import * as styles from './Tabs.css';

import { TabsContextType } from './index';

type TabsListProps = {
  className?: string;
  children: ReactNode | ((context: TabsContextType) => ReactNode);
};

const TabsList = ({ className, children }: TabsListProps) => {
  const context = useTabs();

  return (
    <div className={clsx(styles.list, className)}>
      {typeof children === 'function' ? children(context) : children}
    </div>
  );
};

export default TabsList;

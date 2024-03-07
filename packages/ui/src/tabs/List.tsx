import { clsx } from 'clsx';

import * as styles from './Tabs.css';

type TabsListProps = {
  className?: string;
  children: React.ReactNode;
};

const TabsList = ({ className, children }: TabsListProps) => {
  return <div className={clsx(styles.list, className)}>{children}</div>;
};

export default TabsList;

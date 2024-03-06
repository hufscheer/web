import { clsx } from 'clsx';
import { createContext, useState } from 'react';

import TabsContent from './Content';
import TabsList from './List';
import * as styles from './Tabs.css';
import TabsTrigger from './Trigger';

type TabsContextType = {
  value: string;
  setValue: (value: string) => void;
};

export const TabsContext = createContext<TabsContextType>({
  value: '',
  setValue: () => {},
});

type TabsProps = {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
};

const Tabs = ({ defaultValue, className, children }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={clsx(styles.root, className)}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export default Tabs;

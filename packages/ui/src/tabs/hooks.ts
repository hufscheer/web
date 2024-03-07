import { useContext } from 'react';

import { TabsContext } from '.';

const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }

  return context;
};

export default useTabs;

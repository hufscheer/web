import { useContext } from 'react';

import { DialogContext } from '.';

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within a DialogRoot');
  }

  return context;
};

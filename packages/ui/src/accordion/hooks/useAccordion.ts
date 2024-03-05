import { useContext } from 'react';

import { AccordionContext } from '..';

const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }

  return context;
};

export default useAccordion;

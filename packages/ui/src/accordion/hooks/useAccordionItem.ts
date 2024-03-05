import { useContext } from 'react';

import { AccordionItemContext } from '../Item';

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'useAccordionItem must be used within an AccordionItemProvider',
    );
  }

  return context;
};

export default useAccordionItem;

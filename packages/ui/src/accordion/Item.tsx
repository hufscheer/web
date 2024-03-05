import { createContext } from 'react';

type AccordionItemContextType = {
  value: string;
};

export const AccordionItemContext = createContext<AccordionItemContextType>(
  {} as AccordionItemContextType,
);

type AccordionItemProps = {
  value: string;
  children: React.ReactNode;
};

const Item = ({ value, children }: AccordionItemProps) => {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export default Item;

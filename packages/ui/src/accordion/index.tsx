'use client';

import { clsx } from 'clsx';
import { ReactNode, createContext, useCallback, useState } from 'react';

import Content from './Content';
import Item from './Item';
import * as styles from './styles.css';
import Trigger from './Trigger';

type AccordionContextType = {
  accordion: string[];
  handleItemOpen: (value: string) => void;
  handleItemClose: (value: string) => void;
};

export const AccordionContext = createContext<AccordionContextType>({
  accordion: [],
  handleItemOpen: () => {},
  handleItemClose: () => {},
});

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string;
  className?: string;
  children: ReactNode;
}

const Accordion = ({
  type = 'multiple',
  defaultValue,
  className,
  children,
}: AccordionProps) => {
  const [accordion, setAccordion] = useState<string[]>(() =>
    defaultValue ? [defaultValue] : [],
  );

  const handleItemOpen = useCallback(
    (itemValue: string) =>
      setAccordion((prevValue = []) =>
        type === 'multiple' ? [...prevValue, itemValue] : [itemValue],
      ),
    [type],
  );

  const handleItemClose = useCallback(
    (itemValue: string) =>
      setAccordion((prevValue = []) =>
        prevValue.filter(value => value !== itemValue),
      ),
    [setAccordion],
  );

  return (
    <AccordionContext.Provider
      value={{ accordion, handleItemOpen, handleItemClose }}
    >
      <div className={clsx(styles.root, className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Trigger = Trigger;
Accordion.Item = Item;
Accordion.Content = Content;

export default Accordion;

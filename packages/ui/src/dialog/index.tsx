import { AnimatePresence } from 'framer-motion';
import { createContext, useCallback, useState } from 'react';

import ModalClose from './Close';
import ModalContent from './Content';
import ModalTrigger from './Trigger';

type ModalContext = {
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
};

export const ModalContext = createContext<ModalContext>({
  open: false,
  onOpenChange: () => {},
  onOpenToggle: () => {},
});

type ModalRootProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalRootProps) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);
  const onOpenToggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <ModalContext.Provider value={{ open, onOpenChange, onOpenToggle }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </ModalContext.Provider>
  );
};

Modal.Close = ModalClose;
Modal.Content = ModalContent;
Modal.Trigger = ModalTrigger;

export default Modal;

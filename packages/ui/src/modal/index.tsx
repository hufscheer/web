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

type ModalProps = {
  defaultState?: boolean;
  children: React.ReactNode;
};

const Modal = ({ defaultState, children }: ModalProps) => {
  const [open, setOpen] = useState(defaultState ?? false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);
  const onOpenToggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <ModalContext.Provider value={{ open, onOpenChange, onOpenToggle }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Close = ModalClose;
Modal.Content = ModalContent;
Modal.Trigger = ModalTrigger;

export default Modal;

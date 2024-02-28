import { AnimatePresence } from 'framer-motion';
import { createContext, useCallback, useState } from 'react';

import DialogClose from './Close';
import DialogContent from './Content';
import DialogTrigger from './Trigger';

type DialogContext = {
  open: boolean;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
};

export const DialogContext = createContext<DialogContext>({
  open: false,
  onOpenChange: () => {},
  onOpenToggle: () => {},
});

type DialogProps = {
  children: React.ReactNode;
};

const Dialog = ({ children }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback((open: boolean) => setOpen(open), []);
  const onOpenToggle = useCallback(() => setOpen(prev => !prev), []);

  return (
    <DialogContext.Provider value={{ open, onOpenChange, onOpenToggle }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </DialogContext.Provider>
  );
};

Dialog.Close = DialogClose;
Dialog.Content = DialogContent;
Dialog.Trigger = DialogTrigger;

export default Dialog;

'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@hcc/ui';
import { isValidElement, ReactNode } from 'react';

type AlertDialogProps = {
  title: string;
  description: ReactNode;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  children: ReactNode;
};

const AlertDialog = ({
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  children,
}: AlertDialogProps) => {
  return (
    <Dialog>
      <DialogOverlay />
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {isValidElement(description) ? (
            <>
              <DialogDescription />
              {description}
            </>
          ) : (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          {secondaryActionLabel && (
            <DialogClose asChild>
              <Button
                colorScheme="secondary"
                size="sm"
                fullWidth
                onClick={() => {
                  if (onSecondaryAction) onSecondaryAction();
                }}
              >
                {secondaryActionLabel}
              </Button>
            </DialogClose>
          )}
          <DialogClose asChild>
            <Button
              size="sm"
              fullWidth
              onClick={() => {
                if (onPrimaryAction) onPrimaryAction();
              }}
            >
              {primaryActionLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;

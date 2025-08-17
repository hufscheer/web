import { Button, Modal, Typography } from '@hcc/ui';
import { type ReactNode, useState } from 'react';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  primaryTitle?: string;
  secondaryTitle?: string;
  onPrimaryClick?: () => void | Promise<void>;
};

export const AlertDialog = ({
  title,
  description,
  primaryTitle,
  secondaryTitle = '취소',
  onPrimaryClick,
  children,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrimaryClick = async () => {
    if (onPrimaryClick) {
      const result = onPrimaryClick();
      if (result instanceof Promise) {
        try {
          setLoading(true);
          await result;
        } catch (e) {
          console.error(e);
          setLoading(false);
          return;
        }
      }
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content className="w-full max-w-[320px] rounded-lg bg-white p-4">
        <Typography fontSize={18} weight="semibold" lineHeight="snug" asChild>
          <Modal.Title className="break-keep text-left">{title}</Modal.Title>
        </Typography>
        <Typography
          className="mt-2"
          color="var(--color-neutral-500)"
          weight="medium"
          lineHeight="snug"
          asChild
        >
          <Modal.Description>{description}</Modal.Description>
        </Typography>

        <div className="row-between mt-6 gap-2.5">
          <Modal.Close asChild>
            <Button className="flex-1" variant="subtle" color="black">
              {secondaryTitle}
            </Button>
          </Modal.Close>
          <Button
            className="flex-1"
            variant="solid"
            color="black"
            onClick={handlePrimaryClick}
            disabled={loading}
          >
            {primaryTitle}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

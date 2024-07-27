import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@hcc/ui';

type AlertDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description: string;
};

const AlertDialog = ({
  isOpen,
  setIsOpen,
  title,
  description,
}: AlertDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent style={{ maxWidth: 380 }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            colorScheme="secondary"
            size="sm"
            fullWidth
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button size="sm" fullWidth onClick={() => setIsOpen(false)}>
            해제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;

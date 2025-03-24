import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@hcc/ui';
import { cloneElement, ReactElement, ReactNode, useState } from 'react';

import * as styles from './styles.css';

type FormBottomSheetProps = {
  title: string;
  icon: ReactNode;
  form: ReactElement<{ onClose?: () => void }>;
};

const FormBottomSheet = ({ title, icon, form }: FormBottomSheetProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
      <BottomSheetTrigger asChild>
        <button className={styles.controlButton}>
          {icon}
          {title}
        </button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetHeader>
          <BottomSheetTitle>{title}</BottomSheetTitle>
        </BottomSheetHeader>
        <hr className={styles.sheetDivider} />
        <BottomSheetDescription />
        {cloneElement(form, {
          onClose: () => setIsOpen(false),
        })}
      </BottomSheetContent>
    </BottomSheet>
  );
};

export default FormBottomSheet;

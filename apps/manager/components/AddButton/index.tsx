import { Button, ButtonProps } from '@mantine/core';

import * as styles from './AddButton.css';

interface AddButtonProps extends ButtonProps {
  onClick: () => void;
}

export default function AddButton({
  variant = 'subtle',
  children,
  ...props
}: AddButtonProps) {
  return (
    <Button variant={variant} className={styles.addButton} {...props}>
      {children}
    </Button>
  );
}

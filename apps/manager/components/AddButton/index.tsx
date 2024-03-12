import { Button, ButtonProps, createPolymorphicComponent } from '@mantine/core';
import { forwardRef } from 'react';

import * as styles from './AddButton.css';

interface AddButtonProps extends ButtonProps {}

const AddButton = createPolymorphicComponent<'button', AddButtonProps>(
  forwardRef<HTMLButtonElement, AddButtonProps>(function AddButton(
    { variant = 'subtle', children, ...props }: AddButtonProps,
    ref,
  ) {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={styles.addButton}
        {...props}
      >
        {children}
      </Button>
    );
  }),
);

export default AddButton;

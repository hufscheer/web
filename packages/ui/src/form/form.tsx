import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useId,
} from 'react';
import { FieldPath, FieldValues, FormProvider } from 'react-hook-form';

import * as styles from './styles.css';
import { useFormField } from './useFormField';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  id: string;
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  children: ReactNode;
}

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  children,
}: FormFieldProps<TFieldValues, TName>) => {
  const id = useId();

  return (
    <FormFieldContext.Provider value={{ name, id }}>
      <div className={styles.formField}>{children}</div>
    </FormFieldContext.Provider>
  );
};

interface FormLabelProps extends ComponentPropsWithoutRef<'label'> {}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { formItemId, isDirty } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        data-dirty={isDirty ? 'filled' : 'empty'}
        className={clsx(styles.label, className)}
        {...props}
      >
        {children}
      </label>
    );
  },
);
FormLabel.displayName = 'FormLabel';

const FormControl = ({ className, ...props }: ComponentProps<typeof Slot>) => {
  const {
    register,
    name,
    error,
    formItemId,
    formDescriptionId,
    formMessageId,
  } = useFormField();

  return (
    <Slot
      {...register(name)}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      className={clsx(styles.control, error && styles.errorBorder, className)}
      aria-invalid={!!error}
      {...props}
    />
  );
};

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={clsx(error && styles.errorMessage, className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export { Form, FormLabel, FormControl, FormMessage, FormField };

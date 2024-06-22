import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormFieldContext } from './form';

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { register, getFieldState, formState, getValues } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  return {
    register,
    name: fieldContext.name,
    value: getValues(fieldContext.name),
    formItemId: `${fieldContext.id}-form-item`,
    formDescriptionId: `${fieldContext.id}-form-item-description`,
    formMessageId: `${fieldContext.id}-form-item-message`,
    ...fieldState,
  };
};

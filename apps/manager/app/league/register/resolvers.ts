import { rem } from '@hcc/styles';
import { PartialVarsResolver, StepperFactory } from '@mantine/core';

export const stepperResolver: PartialVarsResolver<StepperFactory> = () => {
  return {
    root: {
      '--stepper-icon-size': rem(32),
      '--stepper-fz': rem(14),
    },
  };
};

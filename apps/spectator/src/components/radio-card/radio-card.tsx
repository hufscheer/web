'use client';

import { Radio, RadioGroup } from '@base-ui/react';
import { CheckCircleFillIcon } from '@hcc/icons';

import { cn } from '~/utils/cn';

type GroupProps = RadioGroup.Props;

const Group = ({ className, ...rest }: GroupProps) => (
  <RadioGroup className={cn('flex flex-col gap-2.5', className)} {...rest} />
);

type RootProps = Radio.Root.Props;

const Root = ({ render = <button />, nativeButton = true, className, ...rest }: RootProps) => (
  <Radio.Root
    nativeButton={nativeButton}
    render={render}
    className={cn(
      'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-neutral-300 bg-white p-4 transition-colors hover:bg-greyscale-25',
      'data-checked:border-(--color-primary-600) data-checked:bg-[#EEF6FF]',
      className,
    )}
    {...rest}
  />
);

type IndicatorProps = Radio.Indicator.Props;

const Indicator = ({ keepMounted = true, className, children, ...rest }: IndicatorProps) => (
  <Radio.Indicator
    keepMounted={keepMounted}
    className={cn(
      'flex size-5 items-center justify-center rounded-full border border-neutral-200 bg-transparent in-data-checked:border-(--color-primary-600) in-data-checked:bg-(--color-primary-600)',
      className,
    )}
    {...rest}
  >
    {children ?? (
      <CheckCircleFillIcon className="hidden h-full w-full text-(--color-primary-600) in-data-checked:block" />
    )}
  </Radio.Indicator>
);

export const RadioCard = { Group, Root, Indicator };

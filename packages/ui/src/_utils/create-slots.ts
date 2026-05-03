'use client';

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import { Slot } from '@radix-ui/react-slot';
import { createElement, forwardRef, useMemo, useRef } from 'react';

/* ------ create-custom-props utility ------ */

type SlotDefinition<TElement extends ElementType = ElementType> = {
  comp: TElement;
  renderWhenEmpty?: boolean;
};

type SlotMap = Record<string, SlotDefinition>;
type PolymorphicSlotProps<TElement extends ElementType> = ComponentPropsWithoutRef<TElement> & {
  asChild?: boolean;
};

export type CustomProps<TSlots extends SlotMap> = {
  [K in keyof TSlots]?: PolymorphicSlotProps<TSlots[K]['comp']>;
};

type SlotComponent<TElement extends ElementType> = ForwardRefExoticComponent<
  PropsWithoutRef<PolymorphicSlotProps<TElement>> & RefAttributes<ComponentRef<TElement>>
>;

type SlotComponents<TSlots extends SlotMap> = {
  [K in keyof TSlots]: SlotComponent<TSlots[K]['comp']>;
};

export const createCustomSlots = <TSlots extends SlotMap>(params: TSlots) => {
  const useSlots = (externalProps?: CustomProps<TSlots>) => {
    const customPropsRef = useRef(externalProps);
    customPropsRef.current = externalProps;

    const slotKeys = useMemo(() => Object.keys(params) as Array<keyof TSlots>, []);
    const slots = useMemo(() => {
      return slotKeys.reduce((acc, slotKey) => {
        const slotDefinition = params[slotKey];
        const { comp: Component, renderWhenEmpty = true } = slotDefinition;

        type SlotElement = TSlots[typeof slotKey]['comp'];
        type SlotProps = PolymorphicSlotProps<SlotElement>;
        type SlotPropsWithChildren = SlotProps & { children?: ReactNode };

        const SlotComponent = forwardRef<ComponentRef<SlotElement>, SlotProps>(
          (internalProps, ref) => {
            const slotCustomProps =
              (customPropsRef.current?.[slotKey] as SlotPropsWithChildren) ??
              ({} as SlotPropsWithChildren);

            const { asChild, ...restInternalProps } = internalProps;
            const merged = mergeProps(restInternalProps, slotCustomProps);
            const { children, ...mergedProps } = merged as SlotPropsWithChildren;

            const shouldRender = !renderWhenEmpty && (children === null || children === undefined);
            if (shouldRender) {
              return null;
            }

            const Comp = asChild ? Slot : Component;
            return createElement(Comp, { ...mergedProps, ref }, children);
          },
        );

        SlotComponent.displayName = `CustomSlot(${String(slotKey)})`;

        acc[slotKey] = SlotComponent as SlotComponents<TSlots>[typeof slotKey];

        return acc;
      }, {} as SlotComponents<TSlots>);
    }, [slotKeys]);

    return { slots };
  };

  return { useSlots };
};

/* ------ merge-props utility ------ */

type MergeableProps = Record<string, unknown>;

function mergeProps(slotProps: MergeableProps, childProps: MergeableProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (typeof slotPropValue === 'function' && typeof childPropValue === 'function') {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = (childPropValue as (...a: unknown[]) => unknown)(...args);
          (slotPropValue as (...a: unknown[]) => unknown)(...args);
          return result;
        };
      } else if (typeof slotPropValue === 'function') {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = {
        ...(slotPropValue as Record<string, unknown>),
        ...(childPropValue as Record<string, unknown>),
      };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

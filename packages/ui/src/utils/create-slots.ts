import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ElementType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import { createElement, forwardRef, useMemo, useRef } from 'react';

/* ------ create-custom-props utility ------ */

type SlotDefinition<TElement extends ElementType = ElementType> = {
  comp: TElement;
  renderWhenEmpty?: boolean;
};

type SlotMap = Record<string, SlotDefinition>;

export type CustomProps<TSlots extends SlotMap> = {
  [K in keyof TSlots]?: ComponentPropsWithoutRef<TSlots[K]['comp']>;
};

type SlotComponent<TElement extends ElementType> = ForwardRefExoticComponent<
  PropsWithoutRef<ComponentPropsWithoutRef<TElement>> & RefAttributes<ComponentRef<TElement>>
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
        type SlotProps = ComponentPropsWithoutRef<SlotElement>;
        type SlotPropsWithChildren = SlotProps & { children?: ReactNode };

        const SlotComponent = forwardRef<ComponentRef<SlotElement>, SlotProps>(
          (internalProps, ref) => {
            const slotCustomProps =
              (customPropsRef.current?.[slotKey] as SlotPropsWithChildren) ??
              ({} as SlotPropsWithChildren);

            const { children, ...mergedProps } = mergeProps(internalProps, slotCustomProps);

            const shouldRender = !renderWhenEmpty && (children === null || children === undefined);
            if (shouldRender) {
              return null;
            }

            return createElement(Component, { ...mergedProps, ref }, children);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = any;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

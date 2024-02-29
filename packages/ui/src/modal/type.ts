import {
  ComponentProps,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

type AsProps<C extends ElementType> = {
  as?: C;
};

type KeyWithAs<C extends ElementType, Props> = keyof (AsProps<C> & Props);

export type ElementTypeProps<C extends ElementType> = ComponentProps<C>;

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = object,
> = (Props & AsProps<C>) &
  Omit<ComponentPropsWithoutRef<C>, KeyWithAs<C, Props>>;

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = object,
> = Props & { ref?: PolymorphicRef<C> };

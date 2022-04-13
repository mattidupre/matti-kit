import { Children, cloneElement, createElement } from 'react';

import type {
  Component,
  VoidFunctionComponent,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactNode,
} from 'react';

// This allows us to reference List from a List dependency
// without creating problems with circular references.

type ComponentType =
  | Component
  | FunctionComponent
  | VoidFunctionComponent
  | ForwardRefExoticComponent<unknown>;

const componentTypes = new Map<ComponentType, ComponentType>();

export const registerComponent = (
  component: ComponentType,
  componentAnalog: ComponentType,
) => componentTypes.set(component, componentAnalog);

export const isRegisteredComponent = (component: any) =>
  componentTypes.has(component);

export const isRegisteredElement = (element: any) =>
  element?.type && componentTypes.has(element.type);

export const getRegisteredComponentAnalog = (component: any) =>
  componentTypes.get(component);

export function swapChildrenComponents(
  children: ReactNode,
  extraProps: Record<string, any> = {},
): ReactNode {
  return Children.map(children, (element: React.ReactElement<any, any>) => {
    if (!element?.type) {
      return element;
    }
    const { type: thisComponent, props: prevProps } = element;
    const { children: childrenProp, ...newProps } = prevProps;
    const newChildren = childrenProp
      ? swapChildrenComponents(childrenProp, extraProps)
      : childrenProp;
    const analogComponent = getRegisteredComponentAnalog(thisComponent);
    return analogComponent
      ? createElement(
          (analogComponent as unknown) as FunctionComponent<any>,
          {
            ...extraProps,
            ...newProps,
          },
          newChildren,
        )
      : cloneElement(element, newProps, newChildren);
  });
}

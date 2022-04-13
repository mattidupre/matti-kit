import { Children, cloneElement } from 'react';

import type { ReactNode, ReactElement } from 'react';

// TODO: Write tests

const cloneAllChildren = function cloneAllChildren(
  reactChildren: ReactNode,
  callback: (
    reactElement: ReactElement,
    children: ReactNode,
  ) => Record<string, any>,
  continueWithChildren: (reactElement: ReactElement) => boolean,
) {
  return Children.map(reactChildren, (reactChild: ReactElement) => {
    const children =
      continueWithChildren(reactChild) && reactChild.props.children
        ? cloneAllChildren(
            reactChild.props.children,
            callback,
            continueWithChildren,
          )
        : reactChild.props.children;
    return cloneElement(reactChild, callback(reactChild, children));
  });
};

export default cloneAllChildren;

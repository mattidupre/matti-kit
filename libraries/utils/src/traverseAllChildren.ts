import { Children } from 'react';

import type { ReactNode, ReactElement } from 'react';

/**
 * Execute the callback recursively on the React children.
 */
const traverseAllChildren = function traverseAllChildren(
  reactChildren: ReactNode,
  callback: (
    reactChild: ReactNode,
  ) =>
    | void
    | string
    | number
    | boolean
    | {}
    | ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactPortal,
  continueWithChildren: (reactChild: ReactNode) => boolean,
) {
  return Children.map(reactChildren, (reactChild) => {
    const newReactChild = callback(reactChild) ?? reactChild;
    const newReactChildChildren = (newReactChild as ReactElement)?.props
      ?.children;
    if (
      newReactChildChildren instanceof Object &&
      continueWithChildren(reactChild)
    ) {
      (newReactChild as ReactElement).props.children = traverseAllChildren(
        newReactChildChildren,
        callback,
        continueWithChildren,
      );
    }
    return newReactChild;
  });
};

export default traverseAllChildren;

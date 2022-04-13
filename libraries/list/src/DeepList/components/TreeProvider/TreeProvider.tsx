import React, { useContext, useCallback, useEffect, useRef } from 'react';
import { usePersistentMemo } from '@matti-kit/utils';
import TreeContext from './lib/TreeContext';

import type { Tree, TreeContextValue } from './types';

type Props = {
  children: React.ReactNode;
};

const TreeProvider: React.FC<Props> = ({ children }) => {
  const parentContext = useContext(TreeContext) ?? null;
  const contextValue = usePersistentMemo(() => {
    return {
      currentTree: null,
      parentContext,
    } as TreeContextValue;
  }, []);

  const onFullTreeRenderedQueue = usePersistentMemo<
    TreeContextValue['onFullTreeRenderedQueue']
  >(() => parentContext?.onFullTreeRenderedQueue ?? [], []);

  const onFullTreeRendered = useCallback<
    TreeContextValue['onFullTreeRendered']
  >(
    (callback) => onFullTreeRenderedQueue.push(callback),
    [onFullTreeRenderedQueue],
  );

  const buildCurrentTree = useCallback<TreeContextValue['buildCurrentTree']>(
    (indexInParent, currentTree) => {
      if (
        contextValue.currentTree &&
        contextValue.currentTree !== currentTree
      ) {
        // TODO: This error will throw before an error in a child. Why?
        // throw new Error('Cannot change tree object. Extend it instead.');
      }

      if (parentContext) {
        parentContext?.attachToParent(indexInParent, currentTree);
      } else {
        // eslint-disable-next-line no-param-reassign
        currentTree.parent = null;
        // eslint-disable-next-line no-param-reassign
        currentTree.location ??= [];
        // eslint-disable-next-line no-param-reassign
        currentTree.indexInParent ??= -1;
      }

      contextValue.currentTree = currentTree;
    },
    [contextValue, parentContext],
  );

  const { current: registeredChildTreeQueue } = useRef<Array<Tree>>([]);
  const attachToParent = useCallback<TreeContextValue['attachToParent']>(
    (indexInParent, childrenTree) => {
      if (!contextValue.currentTree) {
        throw new Error('Parent tree not yet registered.');
      }

      // eslint-disable-next-line no-param-reassign
      childrenTree.parent = contextValue.currentTree;
      // eslint-disable-next-line no-param-reassign
      childrenTree.location = [
        ...contextValue.currentTree.location,
        indexInParent,
      ];
      // eslint-disable-next-line no-param-reassign
      childrenTree.indexInParent = indexInParent;

      registeredChildTreeQueue[indexInParent] = childrenTree;
    },
    [contextValue, registeredChildTreeQueue],
  );

  useEffect(() => {
    if (!contextValue.currentTree) {
      throw new Error('Current tree not yet registered.');
    }

    contextValue.currentTree.children = [...registeredChildTreeQueue];
    registeredChildTreeQueue.length = 0;

    // If this is the topmost provider, call onFullTreeRendered functions.
    if (!parentContext) {
      onFullTreeRenderedQueue.forEach((callback) => callback());
      onFullTreeRenderedQueue.length = 0;
    }
  }, [
    contextValue.currentTree,
    onFullTreeRenderedQueue,
    parentContext,
    registeredChildTreeQueue,
  ]);

  Object.assign(contextValue, {
    onFullTreeRenderedQueue,
    onFullTreeRendered,
    buildCurrentTree,
    attachToParent,
  });

  return (
    <TreeContext.Provider value={contextValue}>{children}</TreeContext.Provider>
  );
};

export default TreeProvider;

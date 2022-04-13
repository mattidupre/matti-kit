import React, { useCallback, useState, useMemo } from 'react';
import { mapDownTree } from '@matti-kit/tree';
import { DeepList } from '~/DeepList';
import RecursiveListChild from './RecursiveListChild';

import { GetKeyFromMeta, RecursiveListTree, RenderChild } from '../types';

type Props = {
  currentTree: RecursiveListTree;
  getKeyFromMeta: GetKeyFromMeta;
  renderChild: RenderChild;
  indexInParent?: number;
};

const RecursiveListParent: React.FC<Props> = function RecursiveListParent({
  currentTree,
  getKeyFromMeta,
  renderChild,
  indexInParent = -1,
}) {
  const [recursiveListState, setRecursiveListState] =
    useState<RecursiveListTree>(currentTree);

  // TODO: Eventually handle this at top and use React.memo() on this component.
  const handleListChange = useCallback(
    (newPayload) => {
      console.log('newPayload', newPayload);
      const newTree = mapDownTree(newPayload, {
        callback: ({ direction, meta }) => ({
          listProps: { direction, meta },
        }),
      }) as RecursiveListTree;
      newTree.parent = currentTree.parent;

      setRecursiveListState(newTree);
    },
    [currentTree.parent],
  );

  const {
    children: childTrees,
    value: {
      listProps: { meta = {}, direction, spacing },
    },
  } = recursiveListState;

  const childNodes = useMemo(
    () =>
      childTrees.map(
        ({
          value: {
            listProps: { meta: childMeta },
          },
        }) => renderChild(childMeta),
      ),
    [childTrees, renderChild],
  );

  return (
    <DeepList
      meta={meta}
      direction={direction}
      spacing={spacing}
      listChildCount={childTrees.length}
      listIndex={indexInParent ?? 0}
      onChange={handleListChange}
    >
      {childTrees.map((childTree, childIndex) => {
        const {
          value: {
            listProps: { meta: childMeta },
          },
        } = childTree;
        const childKey = getKeyFromMeta(childMeta, childIndex);

        return childTree.children?.length ? (
          <RecursiveListParent
            key={childKey}
            currentTree={childTree as RecursiveListTree}
            getKeyFromMeta={getKeyFromMeta}
            renderChild={renderChild}
            indexInParent={childIndex}
          />
        ) : (
          <RecursiveListChild
            key={childKey}
            meta={childMeta}
            indexInParent={childIndex}
          >
            {childNodes[childIndex]}
          </RecursiveListChild>
        );
      })}
    </DeepList>
  );
};

export default RecursiveListParent;

import { useContext, useCallback } from 'react';
import { usePersistentMemo } from '@matti-kit/utils';
import TreeContext from './lib/TreeContext';

import type { Tree, TreeValue, ItemValue } from './types';

const useRegisterCurrentTree = <IV extends ItemValue, TV extends TreeValue>(
  indexInParent: number,
  initialValue: (parentTree: Tree | null) => IV,
) => {
  const currentContext = useContext(TreeContext);

  const currentTree = usePersistentMemo(() => {
    return {
      value: initialValue(currentContext.parentContext?.currentTree ?? null),
    };
  }, []) as Tree<IV, TV>;

  const setCurrentTreeValue = useCallback(
    (callback: (prevValue: TV) => TV) => {
      currentTree.value = callback(currentTree.value);
    },
    [currentTree],
  );

  currentContext.buildCurrentTree(indexInParent, currentTree);

  return [currentTree, setCurrentTreeValue] as const;
};

export default useRegisterCurrentTree;

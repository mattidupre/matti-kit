import { useContext, useCallback } from 'react';
import { usePersistentMemo } from '@matti-kit/utils';
import TreeContext from './lib/TreeContext';

import type { Tree, Item, TreeValue, ItemValue } from './types';

const useRegisterChildItem = <IV extends ItemValue, TV extends TreeValue>(
  indexInParent: number,
  initialValue: (parentTree: Tree) => IV,
) => {
  const currentContext = useContext(TreeContext);
  const childItem = usePersistentMemo(() => {
    return {
      value: initialValue(currentContext.currentTree as Tree),
    };
  }, []) as Item<IV, TV>;

  const setChildItemValue = useCallback(
    (callback: (prevValue: IV) => IV) => {
      childItem.value = callback(childItem.value);
    },
    [childItem],
  );

  currentContext.attachToParent(indexInParent, childItem);

  return [childItem, setChildItemValue] as const;
};

export default useRegisterChildItem;

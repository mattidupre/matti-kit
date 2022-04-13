import { useContext, useCallback } from 'react';
import ChangeContext from './ChangeContext';

import type { DragId } from '@matti-kit/drag';

const useGetTreeByDragId = () => {
  const { treesByDragId } = useContext(ChangeContext);
  return useCallback(
    (dragId: DragId) => {
      const tree = treesByDragId.get(dragId);
      if (!tree) {
        throw new Error('Tree not found.');
      }
      return tree;
    },
    [treesByDragId],
  );
};

export default useGetTreeByDragId;

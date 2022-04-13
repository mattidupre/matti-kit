import { useContext, useCallback, useEffect } from 'react';
import ChangeContext from './lib/ChangeContext';
import useTopChangeHandler from './lib/useTopChangeHandler';

import type { DragId } from '@matti-kit/drag';
import type useList from '~/useList';
import type { ListTree } from '~/types';

const useListOnChange = (listDragId: DragId, currentTree: ListTree) => {
  const { treesByDragId, pushToChangeQueue } = useContext(ChangeContext);

  useEffect(() => {
    treesByDragId.set(listDragId, currentTree);
    return () => {
      treesByDragId.delete(listDragId);
    };
  }, [currentTree, listDragId, treesByDragId]);

  useTopChangeHandler(currentTree);

  return useCallback<Parameters<typeof useList>[0]['onChange']>(
    ({ listPayload, draggingPayload, ...event }) =>
      pushToChangeQueue({
        ...event,
        listPayload, // listPayload: clonePayload(listPayload),
        draggingPayload, // draggingPayload: draggingPayload ? clonePayload(draggingPayload) : null,
      }),
    [pushToChangeQueue],
  );
};

export default useListOnChange;

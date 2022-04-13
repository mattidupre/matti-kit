/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
import React, { useMemo, useCallback, useRef } from 'react';
import { useIsDiff, usePersistentMemo } from '@matti-kit/utils';
import getNewIndexInList from './lib/getNewIndexInList';
import buildOrder from './lib/buildOrder';

import type { Direction, DragId } from '@matti-kit/drag';
import type { Position, Rect, Order } from '../../types';

import getPlacementFromRects from './lib/getPlacementFromRects';
import getCoordsFromRect from './lib/getCoordsFromRect';

type Options = {
  direction: Direction;
  clone: boolean;
  listDragId: DragId;
  childDragIds: Array<DragId>;
  listRectRef: React.MutableRefObject<Rect>;
  itemPositionsRef: React.MutableRefObject<Array<Position>>;
  isOverRef: React.RefObject<boolean>;
};

type BuildCallbackOptions = {
  draggingDragId: DragId;
  draggingRect: Parameters<typeof getCoordsFromRect>[0];
};

const useListOrder = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listDragId,
  direction,
  clone: cloneItem,
  childDragIds,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listRectRef, // TODO
  itemPositionsRef,
  isOverRef,
}: Options) => {
  const isPositionDiff = useIsDiff<string>();
  const isInsideDiff = useIsDiff<boolean | null>(null);

  const originalOrder = usePersistentMemo(
    () =>
      ({
        prevIndexes: childDragIds.map((_, index) => index),
        newIndexes: childDragIds.map((_, index) => index),
        items: childDragIds.map((dragId, index) => ({
          dragId,
          action: null,
          prevIndex: index,
          newIndex: index,
        })),
      } as Order),
    [childDragIds],
  );
  const currentOrderRef = useRef<Order>(originalOrder as Order);
  const isChangedRef = useRef<boolean>(false);

  const build = useCallback(
    ({ draggingDragId, draggingRect }: BuildCallbackOptions) => {
      const originalIndexInList = childDragIds.indexOf(draggingDragId);
      const isItemFromList = originalIndexInList >= 0;

      const coords = getCoordsFromRect(draggingRect);

      const { current: isInsideList } = isOverRef;
      isInsideDiff(isInsideList);

      if (!isInsideDiff() && !isInsideList) {
        return;
      }

      const placementStr = getPlacementFromRects(
        coords[direction],
        itemPositionsRef.current,
      );
      if (!isInsideDiff() && !isPositionDiff(placementStr)) {
        return;
      }

      const newIndexInList = getNewIndexInList({
        direction,
        childCount: childDragIds.length,
        isItemFromList,
        placement: placementStr,
      });

      const newOrder = buildOrder({
        listDragId,
        isItemFromList,
        isInsideList,
        cloneItem,
        newItemDragId: draggingDragId,
        originalIndexInList,
        originalOrder,
        newIndexInList,
        childDragIds,
      });

      if (newOrder === -1) {
        isChangedRef.current = false;
        currentOrderRef.current = originalOrder;
        return;
      }

      isChangedRef.current = true;
      currentOrderRef.current = newOrder;
    },
    [
      childDragIds,
      isOverRef,
      isInsideDiff,
      direction,
      itemPositionsRef,
      isPositionDiff,
      listDragId,
      cloneItem,
      originalOrder,
    ],
  );

  const reset = useCallback(() => {
    currentOrderRef.current = originalOrder;
  }, [originalOrder]);

  return useMemo(
    () => ({
      build,
      reset,
      currentOrderRef,
      isChangedRef,
    }),
    [build, reset],
  );
};

export default useListOrder;

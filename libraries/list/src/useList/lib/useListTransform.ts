import React, { useCallback, useMemo } from 'react';
import { useIsDiff, useIsDiffs } from '@matti-kit/utils';

import type { DragId, Direction } from '@matti-kit/drag';
import type {
  Position,
  ApplyTransform,
  ResetTransform,
  InitializeTransform,
  Order,
} from '../types';

type Options = {
  direction: Direction;
  listDragId: DragId;
  itemElRefs: Array<React.MutableRefObject<HTMLElement>>;
  itemBasePositionsRef: React.MutableRefObject<Array<Position>>;
  placeholderElRefs: Array<React.MutableRefObject<HTMLElement>>;
  boundingPositionRef: React.MutableRefObject<Position>;
  listElRef: React.MutableRefObject<HTMLElement>;
  previewElRef: React.MutableRefObject<HTMLElement>;
  previewBasePositionRef: React.MutableRefObject<Position>;
  applyTransform: ApplyTransform;
  resetTransform: ResetTransform;
  initializeTransform: InitializeTransform;
  isOverRef: React.RefObject<boolean>;
};

const useListTransform = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listDragId,
  direction,
  itemElRefs,
  itemBasePositionsRef,
  placeholderElRefs,
  boundingPositionRef,
  listElRef,
  previewElRef,
  previewBasePositionRef,
  applyTransform,
  resetTransform,
  initializeTransform,
  isOverRef,
}: Options) => {
  const isOverDiff = useIsDiff<boolean>();
  const isPositionsDiff =
    useIsDiffs<
      [
        typeof itemBasePositionsRef.current,
        typeof boundingPositionRef.current,
        typeof previewBasePositionRef.current,
      ]
    >();
  const isOrderDiff = useIsDiff<Order>();

  const transform = useCallback(
    (newOrder: Order) => {
      if (!itemBasePositionsRef || !previewBasePositionRef) {
        throw new Error('Refresh list positions first.');
      }

      if (
        !isOverDiff(isOverRef.current) &&
        !isPositionsDiff([
          itemBasePositionsRef.current,
          boundingPositionRef.current,
          previewBasePositionRef.current,
        ]) &&
        !isOrderDiff(newOrder)
      ) {
        return;
      }

      applyTransform({
        direction,
        showPlaceholder: true,
        wrapperPosition: boundingPositionRef.current,
        previewPosition: previewBasePositionRef.current,
        positions: itemBasePositionsRef.current,
        wrapperEl: listElRef.current,
        itemEls: itemElRefs.map(({ current: el }) => el),
        placeholderEls: placeholderElRefs.map(({ current: el }) => el),
        previewEl: previewElRef.current,
        isHovering: isOverRef.current,
        newOrder,
        debug: {
          listDragId,
        },
      });
    },
    [
      applyTransform,
      boundingPositionRef,
      direction,
      isOrderDiff,
      isOverDiff,
      isOverRef,
      isPositionsDiff,
      itemBasePositionsRef,
      itemElRefs,
      listDragId,
      listElRef,
      placeholderElRefs,
      previewBasePositionRef,
      previewElRef,
    ],
  );

  const reset = useCallback(() => {
    resetTransform({
      direction,
      itemEls: itemElRefs.map(({ current: itemEl }) => itemEl),
      placeholderEls: placeholderElRefs.map(({ current: el }) => el),
      previewEl: previewElRef.current,
      wrapperEl: listElRef.current,
    });
  }, [
    direction,
    itemElRefs,
    listElRef,
    placeholderElRefs,
    previewElRef,
    resetTransform,
  ]);

  const { previewStyle, placeholderStyle, itemStyle } = useMemo(
    () => initializeTransform({ direction }),
    [direction, initializeTransform],
  );

  return useMemo(
    () => ({
      previewStyle,
      placeholderStyle,
      itemStyle,
      transform,
      reset,
    }),
    [itemStyle, placeholderStyle, previewStyle, reset, transform],
  );
};

export default useListTransform;

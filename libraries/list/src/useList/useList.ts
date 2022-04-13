import { useRef, useCallback, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import {
  useSortedDragEvent,
  useDragEvent,
  useTargetEvent,
  getDragIdFromEvent,
  useIsOverRef,
  getDraggingRectFromEvent,
  getPayloadFromEvent,
} from '@matti-kit/drag';
import useListRefs from './lib/useListRefs';
import useListDroppable from './lib/useListDroppable';
import useListPositions from './lib/useListPositions';
import useListOrder from './lib/useListOrder';
import useListTransform from './lib/useListTransform';

import type { UseListOptions, ListAction } from './types';

const useList = ({
  listPayload,
  listDragId,
  childDragIds,
  direction,
  clone,
  initializeTransform,
  applyTransform,
  resetTransform,
  onChange,
  disableDrop = false,
  listDepth = null,
}: UseListOptions) => {
  const isOverRef = useIsOverRef(listDragId);

  const { listElRef, itemElRefs, placeholderElRefs, previewElRef } =
    useListRefs({
      listDragId,
      childDragIds,
    });

  const { listElRef: listElDroppableRef } = useListDroppable({
    listDragId,
    disableDrop,
    listPayload,
  });

  const {
    listRectRef,
    itemBasePositionsRef,
    boundingPositionRef,
    previewBasePositionRef,
    build: buildPositions,
  } = useListPositions({
    listDragId,
    direction,
    listElRef,
    itemElRefs,
    placeholderElRefs,
    previewElRef,
  });

  const {
    build: buildListOrder,
    reset: resetListOrder,
    currentOrderRef,
    isChangedRef,
  } = useListOrder({
    direction,
    clone,
    listDragId,
    childDragIds,
    listRectRef,
    itemPositionsRef: itemBasePositionsRef,
    isOverRef,
  });

  const {
    transform: transformListEls,
    reset: resetListEls,
    itemStyle,
    previewStyle,
    placeholderStyle,
  } = useListTransform({
    listDragId,
    direction,
    itemElRefs,
    itemBasePositionsRef,
    placeholderElRefs,
    boundingPositionRef,
    listElRef,
    previewElRef,
    previewBasePositionRef,
    initializeTransform,
    applyTransform,
    resetTransform,
    isOverRef,
  });

  const isInitializedRef = useRef<boolean>(false);

  const initialize = useCallback(() => {
    if (isInitializedRef.current === true) {
      return;
    }
    buildPositions();
    isInitializedRef.current = true;
  }, [buildPositions]);

  const reset = useCallback(() => {
    if (isInitializedRef.current === false) {
      return;
    }
    resetListEls();
    resetListOrder();
    isInitializedRef.current = false;
  }, [resetListEls, resetListOrder]);

  useDragEvent(
    'start',
    useCallback(() => {
      buildPositions();
    }, [buildPositions]),
  );

  useSortedDragEvent(
    'move',
    -listDepth,
    useCallback(
      (ev) => {
        if (isOverRef.current) {
          initialize();
        }

        if (disableDrop) {
          return;
        }

        buildListOrder({
          draggingRect: getDraggingRectFromEvent(ev),
          draggingDragId: getDragIdFromEvent(ev),
        });

        transformListEls(currentOrderRef.current);
      },
      [
        buildListOrder,
        currentOrderRef,
        disableDrop,
        initialize,
        isOverRef,
        transformListEls,
      ],
    ),
  );

  useDragEvent(
    'end',
    useCallback(
      (ev) => {
        const { current: currentOrder } = currentOrderRef;

        if (!isChangedRef.current) {
          reset();
          return;
        }

        const action = currentOrder.items.reduce<ListAction>(
          (prevAction, { action: thisAction }) => {
            if (thisAction && prevAction) {
              throw new Error('Cannot have multiple actions in an event.');
            }
            return thisAction ?? prevAction;
          },
          null,
        );

        onChange({
          action,
          listDragId,
          order: currentOrder,
          draggingDragId: getDragIdFromEvent(ev),
          draggingPayload: getPayloadFromEvent(ev),
          listPayload,
        });

        reset();
      },
      [currentOrderRef, isChangedRef, listDragId, listPayload, onChange, reset],
    ),
  );

  useDragEvent(
    'cancel',
    useCallback(() => {
      reset();
    }, [reset]),
  );

  // useTargetEvent(
  //   listDragId,
  //   'out',
  //   useCallback(() => {
  //     resetListEls();
  //     resetListOrder(); // TODO: Is this logic duplicated?
  //   }, [resetListEls, resetListOrder]),
  // );

  return useMemo(
    () => ({
      listRef: mergeRefs([listElRef, listElDroppableRef]),
      itemRefs: itemElRefs,
      itemStyle,
      previewRef: previewElRef,
      previewStyle,
      placeholderRefs: placeholderElRefs,
      placeholderStyle,
    }),
    [
      itemElRefs,
      itemStyle,
      listElDroppableRef,
      listElRef,
      placeholderElRefs,
      placeholderStyle,
      previewElRef,
      previewStyle,
    ],
  );
};

export default useList;

import React, { useMemo, useRef, useCallback } from 'react';
import { getElBaseRect } from '@matti-kit/utils';

import getPositionFromRect from './lib/getPositionFromRect';
import getBoundingPosition from './lib/getBoundingPosition';

import type { DragId } from '@matti-kit/drag';
import type { Direction } from '~/types';
import type { Position, Rect } from '../../types';

type Options = {
  listDragId: DragId;
  direction: Direction;
  listElRef: React.MutableRefObject<HTMLElement>;
  itemElRefs: Array<React.MutableRefObject<HTMLElement>>;
  placeholderElRefs: Array<React.MutableRefObject<HTMLElement>>;
  previewElRef: React.MutableRefObject<HTMLElement>;
};

const useListPositions = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listDragId,
  direction,
  listElRef,
  itemElRefs,
  placeholderElRefs,
  previewElRef,
}: Options) => {
  const listRectRef = useRef<Rect>();
  const itemBasePositionsRef = useRef<Array<Position>>();
  const boundingPositionRef = useRef<Position>();
  const previewBasePositionRef = useRef<Position>();

  const buildListRect = useCallback(() => {
    listRectRef.current = getElBaseRect(
      listElRef.current.getBoundingClientRect(),
    );
  }, [listElRef]);

  const buildItemPositions = useCallback(() => {
    itemBasePositionsRef.current = [];
    itemElRefs.forEach(({ current: itemEl }, index) => {
      const placeholderEl = placeholderElRefs[index].current;
      const itemBoundingClientRect = itemEl.getBoundingClientRect();
      const itemPosition = getPositionFromRect(
        direction,
        getElBaseRect(itemBoundingClientRect),
      );
      placeholderEl.style.width = `${itemBoundingClientRect.width}px`;
      placeholderEl.style.height = `${itemBoundingClientRect.height}px`;
      itemBasePositionsRef.current[index] = itemPosition;
    });
  }, [direction, itemElRefs, placeholderElRefs]);

  const buildBoundingPosition = useCallback(() => {
    boundingPositionRef.current = getBoundingPosition(
      itemBasePositionsRef.current,
    );
  }, []);

  const buildPreviewPosition = useCallback(() => {
    const { top: parentTop, left: parentLeft } = listRectRef.current;
    const { clientWidth, clientHeight, offsetTop, offsetLeft } =
      previewElRef.current;

    const previewRect: Rect = {
      width: clientWidth,
      height: clientHeight,
      top: parentTop + offsetTop,
      right: parentLeft + offsetLeft + clientWidth,
      bottom: parentTop + offsetTop + clientHeight,
      left: parentLeft + offsetLeft,
    };

    const previewPosition = getPositionFromRect(direction, previewRect);

    previewBasePositionRef.current = previewPosition;
  }, [direction, previewElRef]);

  const build = useCallback(() => {
    buildListRect();
    buildItemPositions();
    buildBoundingPosition();
    buildPreviewPosition();
  }, [
    buildBoundingPosition,
    buildItemPositions,
    buildListRect,
    buildPreviewPosition,
  ]);

  return useMemo(
    () => ({
      listRectRef,
      itemBasePositionsRef,
      boundingPositionRef,
      previewBasePositionRef,
      build,
    }),
    [build],
  );
};

export default useListPositions;

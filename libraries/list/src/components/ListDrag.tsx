import React, { forwardRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';

import { useDraggable } from '@matti-kit/drag';
import ListDragHandle from './ListDragHandle';

import type { DragId, Direction, Payload } from '@matti-kit/drag';

type Props = {
  dragId: DragId;
  direction: Direction;
  payload: Payload;
  handle?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const ListDrag = forwardRef<HTMLElement, Props>(
  (
    {
      dragId,
      direction,
      payload,
      disabled,
      handle = false,
      style: styleProp = {},
      children,
    },
    forwardedRef,
  ) => {
    const {
      attributes,
      listeners,
      setNodeRef: dragRef,
    } = useDraggable({
      dragId,
      payload,
      disabled,
    });

    const style = useMemo<React.CSSProperties>(
      () => ({
        cursor: 'pointer',
        ...styleProp,
      }),
      [styleProp],
    );

    return handle ? (
      <div ref={mergeRefs([forwardedRef, dragRef])} style={style}>
        <ListDragHandle
          direction={direction}
          attributes={attributes}
          listeners={listeners}
        />
        {children}
      </div>
    ) : (
      <div
        ref={mergeRefs([forwardedRef, dragRef])}
        {...listeners}
        {...attributes}
        style={style}
      >
        {children}
      </div>
    );
  },
);

export default ListDrag;

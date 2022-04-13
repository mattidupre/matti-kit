import React from 'react';
import { useDragOverlay } from '@matti-kit/drag';
import { StaticListChild } from '~/StaticList';

import type { DragId, Direction } from '@matti-kit/drag';

type Props = {
  listChildDragId: DragId;
  direction: Direction;
  children: React.ReactNode;
};

const ListChildOverlay: React.FC<Props> = ({
  listChildDragId,
  direction,
  children,
}) => {
  useDragOverlay(listChildDragId, () => (
    <StaticListChild direction={direction}>{children}</StaticListChild>
  ));
  return null;
};

export default ListChildOverlay;

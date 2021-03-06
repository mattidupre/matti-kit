import React from 'react';
import { useDragOverlay } from '@matti-kit/drag';
import StaticifiedList from '../../StaticifiedList';

import type { DragId } from '@matti-kit/drag';
import type { Spacing, Direction } from '~/types';

type Props = {
  listDragId: DragId;
  direction: Direction;
  spacing: Spacing;
  children: React.ReactNode;
};

const ListOverlay: React.FC<Props> = ({
  listDragId,
  direction,
  spacing,
  children,
}) => {
  useDragOverlay(listDragId, () => 'TODO');
  return null;
};

export default ListOverlay;

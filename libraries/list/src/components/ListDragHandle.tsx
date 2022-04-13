import React from 'react';
import { useStyles } from '@matti-kit/utils';
import { useListDragHandleStyle } from '~/styles';

import type { Direction, useDraggable } from '@matti-kit/drag';

type Props = {
  direction: Direction;
  attributes: ReturnType<typeof useDraggable>['attributes'];
  listeners: ReturnType<typeof useDraggable>['listeners'];
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const ListDragHandle: React.FC<Props> = ({
  direction,
  attributes,
  listeners,
  style: styleProp = {},
}) => {
  const style = useStyles(useListDragHandleStyle({ direction }), styleProp);

  return <div {...attributes} {...listeners} style={style} />;
};

export default ListDragHandle;

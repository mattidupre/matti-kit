import { useDraggable as useDnDKitDraggable } from '@dnd-kit/core';

import type { Payload, DragId } from '~/types';

type Options = {
  dragId: DragId;
  payload: Payload;
  disabled?: boolean;
};

const useDraggable = ({ dragId, payload, disabled }: Options) =>
  useDnDKitDraggable({
    id: dragId,
    data: payload,
    disabled,
  });

export default useDraggable;

import { useDroppable as useDnDKitDroppable } from '@dnd-kit/core';

import type { DragId, Payload } from '~/types';

type Options = {
  dragId: DragId;
  payload: Payload;
  disabled?: boolean;
};

const useDroppable = ({ dragId, payload, disabled }: Options) =>
  useDnDKitDroppable({
    id: dragId,
    data: payload,
    disabled,
  });

export default useDroppable;

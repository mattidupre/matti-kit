import type { DragId, Payload } from '~/types';

export type DraggingItem = {
  payload: Payload;
  dragId: DragId;
};

export type DraggingItemContextValue = {
  payload: DraggingItem['payload'] | null;
  dragId: DraggingItem['dragId'] | null;
  updateDraggingItem: (draggingItem: DraggingItem | null) => void;
};

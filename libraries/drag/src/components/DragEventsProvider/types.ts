import type { useEventMap } from '@matti-kit/utils';

import type {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from '@dnd-kit/core';

type EventName = 'start' | 'move' | 'over' | 'end' | 'cancel';

export type DragEventsContextValue = Record<
  EventName,
  ReturnType<typeof useEventMap>
>;

export type DragStartListener = (event: DragStartEvent) => void;
export type DragMoveListener = (event: DragMoveEvent) => void;
export type DragOverListener = (event: DragOverEvent) => void;
export type DragEndListener = (event: DragEndEvent) => void;
export type DragCancelListener = (event: DragCancelEvent) => void;

export type ChangeEvent = {
  (eventName: 'start', fn?: DragStartListener): void;
  (eventName: 'move', fn?: DragMoveListener): void;
  (eventName: 'over', fn?: DragOverListener): void;
  (eventName: 'end', fn?: DragEndListener): void;
  (eventName: 'cancel', fn?: DragCancelListener): void;
};

export type SortedChangeEvent = {
  (eventName: 'start', number, fn?: DragStartListener): void;
  (eventName: 'move', number, fn?: DragMoveListener): void;
  (eventName: 'over', number, fn?: DragOverListener): void;
  (eventName: 'end', number, fn?: DragEndListener): void;
  (eventName: 'cancel', number, fn?: DragCancelListener): void;
};

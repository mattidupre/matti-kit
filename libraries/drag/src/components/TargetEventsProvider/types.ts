import type { useEventMap } from '@matti-kit/utils';
import type { DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import type { DragId } from '~/types';

type EventName = 'over' | 'out' | 'drop';

export type TargetEventsContextValue = Record<
  EventName,
  ReturnType<typeof useEventMap>
>;

export type TargetOverListener = (event: DragMoveEvent) => void;
export type TargetOutListener = (event: DragMoveEvent) => void;
export type TargetDropListener = (event: DragEndEvent) => void;

export type ChangeEvent = {
  (targetDragId: DragId, eventName: 'over', fn: TargetOverListener): void;
  (targetDragId: DragId, eventName: 'out', fn: TargetOutListener): void;
  (targetDragId: DragId, eventName: 'drop', fn: TargetDropListener): void;
};

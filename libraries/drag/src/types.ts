import type { Brand } from 'utility-types';
import type {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from '@dnd-kit/core';

export type DragId = Brand<string, 'DragId'>;

export type Meta = Record<string, any>;

export type Payload = {
  meta: Meta;
};

export type DnDKitDragEvent =
  | DragStartEvent
  | DragMoveEvent
  | DragOverEvent
  | DragEndEvent
  | DragCancelEvent;

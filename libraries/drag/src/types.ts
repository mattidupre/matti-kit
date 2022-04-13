import type { Brand } from 'utility-types';
import type {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from '@dnd-kit/core';

// TODO: Add clone boolean to item itself.

export type DragId = Brand<string, 'DragId'>;

export type OptionalKey = number | string | null | undefined;

export type Direction = 'row' | 'column';

export type Meta = Record<string, any>;

export type Payload = {
  meta: Meta;
  direction: Direction;
};

export type DnDKitDragEvent =
  | DragStartEvent
  | DragMoveEvent
  | DragOverEvent
  | DragEndEvent
  | DragCancelEvent;

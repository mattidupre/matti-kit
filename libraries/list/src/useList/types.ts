import type { CSSProperties } from 'react';
import type { Payload, DragId } from '@matti-kit/drag';
import type { ListPayload, Direction } from '~/types';

export type ListAction = 'INSERT' | 'DELETE' | 'REORDER';

export type Order = {
  items: Array<{
    prevIndex: number;
    newIndex: number;
    dragId: DragId;
    action: ListAction | null;
  }>;
  insertIndex: number | null;
  prevIndexes: Array<number>;
  newIndexes: Array<number>;
};

export type UseListOptions = {
  listPayload: ListPayload;
  listDragId: DragId;
  childDragIds: Array<DragId>;
  direction: Direction;
  clone: boolean;
  initializeTransform: InitializeTransform;
  applyTransform: ApplyTransform;
  resetTransform: ResetTransform;
  onChange: OnListChange;
  disableDrop?: boolean;
  listDepth?: number | null;
};

export type Coords = {
  x: number;
  y: number;
} & Record<Direction, number>;

export type Placement = [
  'outside-before' | 'inside-before' | 'inside-after' | 'outside-after',
  number,
];

export type Rect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

export type Position = Rect & {
  before: number;
  after: number;
  size: number;
  center: number;
};

export type ApplyTransform = (options: {
  direction: Direction;
  showPlaceholder: boolean;
  wrapperPosition: Position;
  previewPosition: Position;
  positions: Array<Position>;
  wrapperEl: HTMLElement;
  itemEls: Array<HTMLElement>;
  placeholderEls: Array<HTMLElement>;
  previewEl: HTMLElement;
  isHovering: boolean;
  newOrder: Order;
  debug: {
    listDragId: DragId;
  };
}) => void;

export type ResetTransform = (options: {
  direction: Direction;
  itemEls: Array<HTMLElement>;
  placeholderEls: Array<HTMLElement>;
  previewEl: HTMLElement;
  wrapperEl: HTMLElement;
}) => void;

export type InitializeTransform = (options: { direction: Direction }) => {
  itemStyle: CSSProperties;
  previewStyle: CSSProperties;
  placeholderStyle: CSSProperties;
};

export type Transform = (...args: Array<any>) => {
  apply: ApplyTransform;
  reset: ResetTransform;
  initialize: InitializeTransform;
};

export type OnListChange = (ev: {
  action: ListAction;
  listDragId: DragId;
  listPayload: ListPayload;
  draggingDragId: DragId;
  draggingPayload: Payload | null;
  order: Order;
}) => void;

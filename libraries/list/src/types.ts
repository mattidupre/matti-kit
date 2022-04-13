import type { FullTree } from '@matti-kit/tree';
import type { DragId, Payload } from '@matti-kit/drag';
import type useList from '~/useList';

export type ChangeAction = Parameters<
  Parameters<typeof useList>[0]['onChange']
>[0];

export type ListPayload = FullTree<Payload>;

export type TreeLocation = Array<number>;

export type Direction = 'row' | 'column';

export type Spacing = number;

export type Handle = boolean;

export type OnListComponentChange = (payload: ListPayload) => void;

export type Accept = (payload: ListPayload) => boolean;

export type ListMeta = {};

export type ListAttributes = {
  direction: Direction;
  spacing: Spacing;
  disabled: boolean;
  onListComponentChange: OnListComponentChange | null;
};

export type ItemAttributes = {
  handle: Handle;
};

export type ListTreeValue = {
  value: {
    isList: true;
    meta: ListMeta;
    dragId: DragId;
    listAttributes: ListAttributes;
  };
};

export type ItemTreeValue = {
  value: {
    isList: false;
    meta: ListMeta;
    dragId: DragId;
    listAttributes: ListAttributes;
  };
};

export type ListTree = FullTree<ListTreeValue, ItemTreeValue>;

import type { DragId } from '@matti-kit/drag';
import type { ListTree, ChangeAction } from '~/types';

export type ChangeContextValue = {
  treesByDragId: Map<DragId, ListTree>;
  changeQueue: Array<ChangeAction>;
  pushToChangeQueue: (queueValues: ChangeAction) => void;
  flushChangeQueue: () => Array<ChangeAction>;
};

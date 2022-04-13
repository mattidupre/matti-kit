/* eslint-disable no-else-return */
import { insertItem, deleteItem, moveItem } from './transformOrder';

import type { DragId } from '@matti-kit/drag';
import type { Order } from '../../../types';

type Options = {
  listDragId: DragId;
  isItemFromList: boolean;
  isInsideList: boolean;
  cloneItem: boolean;
  newItemDragId: DragId;
  originalIndexInList: number;
  originalOrder: Order;
  newIndexInList: number;
  childDragIds: Array<DragId>;
};

const buildOrder = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listDragId,
  isItemFromList,
  isInsideList: isInside,
  cloneItem,
  newItemDragId: draggingDragId,
  originalIndexInList,
  originalOrder,
  newIndexInList,
}: Options) => {
  if (!isItemFromList && isInside) {
    // INSERT item
    return insertItem(originalOrder.items, newIndexInList, {
      dragId: draggingDragId,
      action: null,
    });
  } else if (isItemFromList && !isInside) {
    if (cloneItem) {
      // RESET items
      return -1;
    } else {
      // REMOVE item
      return deleteItem(originalOrder.items, originalIndexInList);
    }
  } else if (!isItemFromList && !isInside) {
    // RESET items
    return -1;
  } else if (isItemFromList && isInside) {
    if (originalIndexInList === newIndexInList) {
      return originalOrder;
    } else {
      // MOVE item
      return moveItem(originalOrder.items, originalIndexInList, newIndexInList);
    }
  }

  throw new Error('Cannot build order.');
};

export default buildOrder;

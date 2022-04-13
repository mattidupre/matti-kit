/* eslint-disable no-param-reassign */
import type { Order } from '../../../types';

type Item = Omit<Order['items'][number], 'prevIndex' | 'newIndex'>;

const checkRange = (maxIndex: number, ...indexes: Array<number>) => {
  indexes.forEach((index) => {
    if (index < 0) {
      throw new Error('Index less than 0.');
    }
    if (index > maxIndex) {
      throw new Error('Index greater than max.');
    }
  });
};

export const insertItem = (
  partialItems: Array<Item>,
  insertIndex: number,
  newItem: Item,
): Order => {
  checkRange(partialItems.length, insertIndex);
  const prevIndexes = [];
  const newIndexes = [];
  const items = [...partialItems, null]
    .reduce<Order['items']>((arr, item, prevIndex) => {
      if (prevIndex === insertIndex) {
        prevIndexes.push(-1);
        arr.push({
          ...newItem,
          action: 'INSERT',
          prevIndex: -1,
          newIndex: arr.length,
        });
      }
      if (item) {
        newIndexes.push(arr.length);
        prevIndexes.push(prevIndex);
        arr.push({
          ...item,
          action: null,
          prevIndex,
          newIndex: arr.length,
        });
      }
      return arr;
    }, [])
    .slice(0, partialItems.length + 1);
  return { prevIndexes, newIndexes, items, insertIndex };
};

export const deleteItem = (partialItems: Array<Item>, deleteIndex: number) => {
  checkRange(partialItems.length - 1, deleteIndex);
  const prevIndexes = [];
  const newIndexes = [];
  const items = partialItems.reduce<Order['items']>((arr, item, prevIndex) => {
    if (prevIndex === deleteIndex) {
      newIndexes.push(-1);
      arr.push({
        ...item,
        action: 'DELETE',
        prevIndex,
        newIndex: -1,
      });
    } else {
      newIndexes.push(prevIndex < deleteIndex ? prevIndex : prevIndex - 1);
      prevIndexes.push(prevIndex);
      arr.push({
        ...item,
        action: null,
        prevIndex,
        newIndex: prevIndex < deleteIndex ? prevIndex : prevIndex - 1,
      });
    }
    return arr;
  }, []);
  return { prevIndexes, newIndexes, items, insertIndex: null };
};

export const moveItem = (
  partialItems: Array<Item>,
  fromIndex: number,
  toIndex: number,
): Order => {
  checkRange(partialItems.length - 1, fromIndex, toIndex);
  if (fromIndex === toIndex) {
    throw new Error('TODO');
  }
  // const TEMP = [];
  const prevIndexes = [];
  const newIndexes = [];
  const items = partialItems.reduce<Order['items']>((arr, _, prevIndex) => {
    if (
      (fromIndex < toIndex && (prevIndex < fromIndex || prevIndex > toIndex)) ||
      (fromIndex > toIndex && (prevIndex > fromIndex || prevIndex < toIndex))
    ) {
      prevIndexes.push(prevIndex);
      newIndexes.push(prevIndex);
      // TEMP.push(['outside', partialItems[prevIndex].dragId]);
      arr.push({
        ...partialItems[prevIndex],
        action: null,
        prevIndex,
        newIndex: arr.length,
      });
    } else if (prevIndex === toIndex) {
      prevIndex = fromIndex;
      prevIndexes.push(prevIndex);
      newIndexes.push(toIndex + (fromIndex < toIndex ? -1 : 1));
      // TEMP.push(['toIndex', partialItems[prevIndex].dragId]);
      arr.push({
        ...partialItems[prevIndex],
        action: 'REORDER',
        prevIndex,
        newIndex: arr.length,
      });
    } else if (prevIndex === fromIndex) {
      prevIndex += fromIndex < toIndex ? 1 : -1;
      prevIndexes.push(prevIndex);
      newIndexes.push(toIndex);
      // TEMP.push(['fromIndex', partialItems[prevIndex].dragId]);
      arr.push({
        ...partialItems[prevIndex],
        action: null,
        prevIndex,
        newIndex: arr.length,
      });
    } else {
      newIndexes.push(prevIndex + (fromIndex < toIndex ? -1 : 1));
      prevIndex += fromIndex < toIndex ? 1 : -1;
      prevIndexes.push(prevIndex);
      // TEMP.push(['inside', partialItems[prevIndex].dragId]);
      arr.push({
        ...partialItems[prevIndex],
        action: null,
        prevIndex,
        newIndex: arr.length,
      });
    }
    return arr;
  }, []);
  // console.log(TEMP);
  return { prevIndexes, newIndexes, items, insertIndex: null };
};

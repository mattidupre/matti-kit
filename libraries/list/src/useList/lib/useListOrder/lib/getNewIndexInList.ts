/* eslint-disable no-lonely-if */
import { Direction } from '@matti-kit/drag';

type Options = {
  direction: Direction;
  childCount: number;
  isItemFromList: boolean;
  placement: string;
};

const getNewIndexInList = ({
  direction,
  childCount,
  isItemFromList,
  placement,
}: Options): number => {
  const [insideOrOutside, beforeOrAfter, targetIndexStr] = placement.split('-');
  const targetIndex = parseInt(targetIndexStr, 10);

  let newIndexInList;
  if (direction === 'row') {
    if (isItemFromList) {
      if (beforeOrAfter === 'before') {
        newIndexInList = targetIndex;
      } else if (beforeOrAfter === 'after') {
        newIndexInList = targetIndex;
      }
    } else {
      if (beforeOrAfter === 'before') {
        newIndexInList = targetIndex;
      } else if (beforeOrAfter === 'after') {
        newIndexInList = targetIndex + 1;
      }
    }
  } else if (direction === 'column') {
    if (isItemFromList) {
      if (insideOrOutside === 'inside') {
        newIndexInList = targetIndex;
      } else if (beforeOrAfter === 'before') {
        newIndexInList = targetIndex;
      } else {
        newIndexInList = Math.min(targetIndex + 1, childCount - 1);
      }
    } else {
      if (beforeOrAfter === 'before') {
        newIndexInList = targetIndex;
      } else if (beforeOrAfter === 'after') {
        newIndexInList = targetIndex + 1;
      }
    }
  }

  return newIndexInList;
};

export default getNewIndexInList;

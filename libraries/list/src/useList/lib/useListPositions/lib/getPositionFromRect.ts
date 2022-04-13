import type { Direction } from '@matti-kit/drag';
import type { Rect, Position } from '../../../types';

const getPositionFromRect = (direction: Direction, rect: Rect): Position => {
  if (direction === 'row') {
    return {
      ...rect,
      before: rect.left,
      after: rect.left + rect.width,
      center: rect.left + rect.width / 2,
      size: rect.width,
    };
  }
  if (direction === 'column') {
    return {
      ...rect,
      before: rect.top,
      after: rect.top + rect.height,
      center: rect.top + rect.height / 2,
      size: rect.height,
    };
  }
  throw new Error('Invalid direction');
};

export default getPositionFromRect;

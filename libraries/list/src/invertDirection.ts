import type { Direction } from '~/types';

const invertDirection = (direction: Direction): Direction => {
  if (direction === 'row') {
    return 'column';
  }
  if (direction === 'column') {
    return 'row';
  }
  throw new Error(`Invalid direction: "${direction}"`);
};

export default invertDirection;

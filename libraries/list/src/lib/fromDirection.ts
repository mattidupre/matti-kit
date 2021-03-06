import type { Direction } from '~/types';

const fromDirection = (direction: Direction, ifColumn: any, ifRow: any) => {
  if (direction === 'column') {
    return ifColumn;
  }
  if (direction === 'row') {
    return ifRow;
  }
  throw new Error(`Invalid direction: "${direction}"`);
};

export default fromDirection;

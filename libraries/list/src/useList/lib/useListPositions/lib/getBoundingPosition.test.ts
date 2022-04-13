import getBoundingPosition from './getBoundingPosition';

import type { Position } from '../../../types';

const rects: Array<Pick<Position, 'before' | 'after' | 'size' | 'center'>> = [
  [5, 50],
  [65, 80],
  [220, 265],
].map(([before, after]) => ({
  before,
  after,
  size: after - before,
  center: before + (after - before) / 2,
}));

describe('getBoundingPosition', () => {
  it('returns valid bounding position', () => {
    expect(getBoundingPosition(rects as Array<Position>)).toEqual({
      before: 5,
      after: 265,
      size: 260,
      center: 135,
    });
  });
});

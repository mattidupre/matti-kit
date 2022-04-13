import getPositionFromRect from './getPositionFromRect';

import type { Rect } from '../../../types';

const rect: Rect = {
  top: 5,
  right: 150,
  bottom: 15,
  left: 50,
  width: 100,
  height: 10,
};

describe('horizontal direction', () => {
  it('creates a position', () => {
    expect(getPositionFromRect('row', rect)).toEqual({
      ...rect,
      before: 50,
      after: 150,
      size: 100,
      center: 100,
    });
  });
});

describe('vertical direction', () => {
  it('creates a position', () => {
    expect(getPositionFromRect('column', rect)).toEqual({
      ...rect,
      before: 5,
      after: 15,
      size: 10,
      center: 10,
    });
  });
});

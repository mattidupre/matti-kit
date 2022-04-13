import type { Position } from '../../../types';

const getPlacementFromRects = (
  basePosition: number,
  positions: Array<Position>,
): string => {
  for (let index = 0; index < positions.length; index += 1) {
    const thisPosition = positions[index];
    const nextPosition =
      index + 1 < positions.length ? positions[index + 1] : null;

    if (basePosition < thisPosition.before) {
      return `outside-before-${index}`;
    }
    if (basePosition <= thisPosition.center) {
      return `inside-before-${index}`;
    }
    if (basePosition <= thisPosition.after) {
      return `inside-after-${index}`;
    }
    if (!nextPosition) {
      return `outside-after-${index}`;
    }
    if (
      basePosition <=
      thisPosition.after + (nextPosition.before - thisPosition.after) / 2
    ) {
      return `outside-after-${index}`;
    }
  }
  throw new Error('Cannot determine index.');
};

export default getPlacementFromRects;

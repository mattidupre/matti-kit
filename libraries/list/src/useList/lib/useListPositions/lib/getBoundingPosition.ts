import type { Position } from '../../../types';

const getBoundingPosition = (positions: Array<Position>): Position => {
  const { before, after } = positions.reduce(
    (
      { before: minBefore, after: maxAfter },
      { before: thisBefore, after: thisAfter },
    ) => ({
      before: Math.min(minBefore, thisBefore),
      after: Math.max(maxAfter, thisAfter),
    }),
    { before: Infinity, after: -Infinity },
  );
  return {
    before,
    after,
    size: after - before,
    center: before + (after - before) / 2,
  };
};

export default getBoundingPosition;

import getPlacementFromRects from './getPlacementFromRects';

import type { Placement, Position } from '../../../types';

type Points = Array<[number, number]>;

const buildPositions = (points: Points): Array<Position> => {
  return points.map(([before, after]) => ({
    before,
    after,
    size: after - before,
    center: before + (after - before) / 2,
  }));
};

type ExpectedValue = [number, Placement[0], Placement[1]];

const buildExpectedValues = (
  positions: Array<Position>,
): Array<ExpectedValue> => {
  const expectedValues: Array<ExpectedValue> = [];
  positions.forEach(({ before, after, center }, index) => {
    const { after: prevAfter } = positions[index - 1] ?? { after: null };
    if (prevAfter === null) {
      expectedValues.push([before - 0.001, 'outside-before', index]);
      expectedValues.push([before, 'inside-before', index]);
    } else if (prevAfter < before) {
      const beforeBetween = prevAfter + (before - prevAfter) / 2;
      expectedValues.push([beforeBetween + 0.001, 'outside-before', index]);
      expectedValues.push([before - 0.001, 'outside-before', index]);
      expectedValues.push([before, 'inside-before', index]);
    }
    expectedValues.push([before + 0.001, 'inside-before', index]);
    expectedValues.push([center - 0.001, 'inside-before', index]);
    expectedValues.push([center, 'inside-before', index]);
    expectedValues.push([center + 0.001, 'inside-after', index]);
    expectedValues.push([after - 0.001, 'inside-after', index]);
    const { before: nextBefore } = positions[index + 1] ?? { before: null };
    if (nextBefore === null) {
      expectedValues.push([after, 'inside-after', index]);
      expectedValues.push([after + 0.001, 'outside-after', index]);
    } else if (after < nextBefore) {
      expectedValues.push([after, 'inside-after', index]);
      const afterBetween = after + (nextBefore - after) / 2;
      expectedValues.push([after + 0.001, 'outside-after', index]);
      expectedValues.push([afterBetween - 0.001, 'outside-after', index]);
      expectedValues.push([afterBetween, 'outside-after', index]);
    }
  });

  return expectedValues;
};

describe.each([
  [
    'spaced',
    [
      [50, 100],
      [150, 200],
      [250, 300],
      [350, 400],
      [450, 500],
    ],
  ],
  [
    'adjacent',
    [
      [50, 100],
      [100, 150],
      [150, 200],
      [250, 300],
      [350, 400],
    ],
  ],
  [
    'mixed',
    [
      [50, 100],
      [150, 200],
      [200, 250],
      [250, 300],
      [350, 400],
    ],
  ],
])('%s positions', (_, points: Points) => {
  const positions = buildPositions(points);
  const expectedValues = buildExpectedValues(positions);
  describe.each(expectedValues)(
    '%d RETURNS %s at index %i',
    (center, expectedPositionName, expectedPositionIndex) => {
      it('returns expected result', () => {
        expect(getPlacementFromRects(center, positions)).toEqual([
          expectedPositionName,
          expectedPositionIndex,
        ]);
      });
    },
  );
});

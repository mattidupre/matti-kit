import isLocationDescendantOfLocation from './isLocationDescendantOfLocation';

describe.each([
  [[1, 2, 3], [1, 2], true],
  [[1, 2, 3], [], true],
  [[], [], true],
  [[1, 2, 3], [1, 2, 3], true],
])('%s', (locationA, locationB, expectedResult) => {
  it(`returns ${expectedResult}`, () => {
    expect(isLocationDescendantOfLocation(locationA, locationB)).toBe(
      expectedResult,
    );
  });
});

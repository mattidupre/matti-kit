import mapDownTree from './mapDownTree';
import buildMockFullTree from './fixtures/buildMockFullTree';
import checkTreeIsValid from './checkTreeIsValid';
import checkTreesAreFullyCloned from './checkTreesAreFullyCloned';
import isTreesEqual from './isTreesEqual';

import type { MockFullTree, MockAnyTree } from './fixtures/types';

let mockFullTree: MockFullTree;
let resultFullTree: MockFullTree;

beforeEach(() => {
  mockFullTree = buildMockFullTree();
});

describe('when callback function is undefined', () => {
  beforeEach(() => {
    resultFullTree = mapDownTree(mockFullTree);
  });

  it('returns a valid tree', () => {
    expect(checkTreeIsValid(resultFullTree)).toBe(true);
  });

  it('that is fully cloned', () => {
    expect(checkTreesAreFullyCloned(resultFullTree, mockFullTree)).toBe(true);
  });

  it('with values pointing to the same reference', () => {
    expect(
      isTreesEqual(resultFullTree, mockFullTree, {
        compare: (treeA, treeB) => treeA.value === treeB.value,
      }),
    ).toBeTrue();
  });
});

describe('when callback function is defined', () => {
  const callback = jest.fn(({ value: { name } }: MockAnyTree) => ({
    name: `MODIFIED: ${name}`,
  }));

  beforeEach(() => {
    resultFullTree = mapDownTree(mockFullTree, { callback });
  });

  afterEach(() => {
    callback.mockClear();
  });

  it('returns a valid tree', () => {
    expect(checkTreeIsValid(resultFullTree)).toBe(true);
  });

  it('calling the callback function', () => {
    expect(callback).toHaveBeenCalled();
    // TODO: How many times?
  });

  it('that is fully cloned, including values', () => {
    expect(
      checkTreesAreFullyCloned(resultFullTree, mockFullTree, {
        compareValue: true,
      }),
    ).toBe(true);
  });

  it('with changed values', () => {
    expect(
      isTreesEqual(resultFullTree, mockFullTree, {
        compare: (treeA, treeB) => {
          return treeA.value.name === `MODIFIED: ${treeB.value.name}`;
        },
      }),
    ).toBeTrue();
  });

  it('NOT pointing to the same reference', () => {
    expect(
      isTreesEqual(resultFullTree, mockFullTree, {
        compare: (treeA, treeB) => treeA.value !== treeB.value,
      }),
    ).toBeTrue();
  });
});

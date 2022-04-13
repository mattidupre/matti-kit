import simplifyTree from './simplifyTree';
import buildMockSimpleTree from './fixtures/buildMockSimpleTree';
import buildMockFullTree from './fixtures/buildMockFullTree';
import checkTreeIsValid from './checkTreeIsValid';
import isTreesEqual from './isTreesEqual';

import type { MockSimpleTree } from './fixtures/types';

let expectedResultTree: ReturnType<typeof buildMockSimpleTree>;
let resultTree: MockSimpleTree;

beforeEach(() => {
  expectedResultTree = buildMockSimpleTree();
  resultTree = simplifyTree(buildMockFullTree());
});

it('returns a valid simple tree', () => {
  expect(checkTreeIsValid(resultTree, { isSimpleTree: true })).toBe(true);
});

it('with the same values', () => {
  expect(
    isTreesEqual<MockSimpleTree>(resultTree, expectedResultTree, {
      compare: (treeA, treeB) => {
        return treeA.value.name === treeB.value.name;
      },
    }),
  ).toBeTrue();
});

import buildMockSimpleTree from './fixtures/buildMockSimpleTree';
import buildTree from './buildTree';
import checkTreeIsValid from './checkTreeIsValid';
import isTreesEqual from './isTreesEqual';

import type { MockTreeValue } from './fixtures/types';
import type { SimpleTree, FullTreeAtTop } from './types';

let mockTree: SimpleTree<MockTreeValue, MockTreeValue>;
let resultTree: FullTreeAtTop<MockTreeValue, MockTreeValue>;

beforeEach(() => {
  mockTree = buildMockSimpleTree();
  resultTree = buildTree(mockTree);
});

it('returns a valid tree', () => {
  expect(checkTreeIsValid(resultTree)).toBe(true);
});

it('returns a tree with the same values', () => {
  expect(isTreesEqual(resultTree, mockTree)).toBeTrue();
});

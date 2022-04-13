import isTreesEqual from './isTreesEqual';

import type { AnyTree } from './types';

type Options = {
  compareValue?: boolean;
};

const compareReferences = (
  treeA: AnyTree,
  treeB: AnyTree,
  property?: string,
) => {
  const vA = property ? (treeA as any)[property] : treeA;
  const vB = property ? (treeB as any)[property] : treeB;
  if (!(vA instanceof Object || vB instanceof Object)) {
    return false;
  }
  return vA === vB;
};

const checkTreesAreFullyCloned = (
  subjectTreeA: AnyTree,
  subjectTreeB: AnyTree,
  { compareValue = false }: Options = {},
) =>
  isTreesEqual(subjectTreeA, subjectTreeB, {
    compare: (treeA, treeB) => {
      if (compareReferences(treeA, treeB)) {
        throw new Error('Trees must not be of the same object reference.');
      }
      if (compareReferences(treeA, treeB, 'location')) {
        throw new Error('Trees must not reference the same location.');
      }
      if (compareReferences(treeA, treeB, 'parent')) {
        throw new Error('Trees must not reference the same parent.');
      }
      if (compareReferences(treeA, treeB, 'children')) {
        throw new Error('Trees must not reference the same children array.');
      }
      if (compareValue && compareReferences(treeA, treeB, 'value')) {
        throw new Error('Trees must not reference the same value.');
      }
      return true;
    },
  });

export default checkTreesAreFullyCloned;

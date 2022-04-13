import getTopTreeWithLocation from './getTopTreeWithLocation';
import isLocationsEqual from './isLocationsEqual';

import type { AnyTree, FullTree } from './types';

type Options<Tree extends AnyTree> = {
  compare?: (treeA: Tree, treeB: Tree) => boolean;
  onNotEqual?: (
    treeA: Tree,
    treeB: Tree,
    currentLocation: Array<number>,
  ) => void;
};

const isTreesEqual = <Tree extends AnyTree>(
  subjectTreeA: Tree,
  subjectTreeB: Tree,
  { compare = (a, b) => a.value === b.value, onNotEqual }: Options<Tree> = {},
) => {
  const [topTreeA, topTreeALocation] = getTopTreeWithLocation(
    subjectTreeA as FullTree,
  );
  const [topTreeB, topTreeBLocation] = getTopTreeWithLocation(
    subjectTreeB as FullTree,
  );

  if (!isLocationsEqual(topTreeALocation, topTreeBLocation)) {
    return false;
  }

  function recursiveCompareTrees(
    currentTreeA: AnyTree,
    currentTreeB: AnyTree,
    currentLocation: Array<number>,
  ): boolean {
    if (!compare(currentTreeA as Tree, currentTreeB as Tree)) {
      if (onNotEqual) {
        onNotEqual(currentTreeA as Tree, currentTreeB as Tree, currentLocation);
      }
      return false;
    }
    if (
      (currentTreeA.children === null || currentTreeA.children === undefined) &&
      (currentTreeB.children === null || currentTreeB.children === undefined)
    ) {
      return true;
    }
    if (
      !Array.isArray(currentTreeA.children) ||
      !Array.isArray(currentTreeB.children)
    ) {
      throw new Error('Invalid children.');
    }
    return (currentTreeA.children as Array<
      AnyTree
    >).every((childTreeA, childIndex) =>
      recursiveCompareTrees(
        childTreeA,
        (currentTreeB.children as Array<AnyTree>)[childIndex],
        [...currentLocation, childIndex],
      ),
    );
  }

  return recursiveCompareTrees(topTreeA as AnyTree, topTreeB as AnyTree, []);
};

export default isTreesEqual;

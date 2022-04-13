import buildMockSimpleTree from './buildMockSimpleTree';
import buildMockFullTree from './buildMockFullTree';
import loopMockTree from './loopMockTree';

import type { BuildOptions, MockTreeValue } from './types';

const buildMockTreeAll = (buildOptions?: BuildOptions) => {
  const allMockLocations: Array<Array<number>> = [];

  const mockSimpleTree = buildMockSimpleTree(buildOptions);
  const allMockSimpleTrees: Array<typeof mockSimpleTree> = [];
  const allMockSimpleTreeValues: Array<MockTreeValue> = [];
  const mockFullTree = buildMockFullTree(buildOptions);
  const allMockFullTrees: Array<typeof mockFullTree> = [];
  const allMockFullTreeValues: Array<MockTreeValue> = [];

  let mockSimpleTreeMiddle = null as typeof mockSimpleTree;
  let mockSimpleTreeBottom = null as typeof mockSimpleTree;

  loopMockTree(mockSimpleTree, (currentTree, currentLocation) => {
    allMockLocations.push([...currentLocation]);
    allMockSimpleTrees.push(currentTree as typeof mockSimpleTree);
    allMockSimpleTreeValues.push(currentTree.value);

    if (
      !mockSimpleTreeMiddle &&
      currentLocation.length >= 1 &&
      currentTree.children
    ) {
      mockSimpleTreeMiddle = currentTree as typeof mockSimpleTree;
    }

    if (
      !mockSimpleTreeBottom &&
      currentLocation.length > 1 &&
      !currentTree.children
    ) {
      mockSimpleTreeBottom = currentTree as typeof mockSimpleTree;
    }
  });

  let mockFullTreeMiddle = null as typeof mockFullTree;
  let mockFullTreeBottom = null as typeof mockFullTree;

  loopMockTree(mockFullTree, (currentTree, currentLocation) => {
    allMockFullTrees.push(currentTree as typeof mockFullTree);
    allMockFullTreeValues.push(currentTree.value);

    if (
      !mockFullTreeMiddle &&
      currentLocation.length >= 1 &&
      currentTree.children
    ) {
      mockFullTreeMiddle = currentTree as typeof mockFullTree;
    }

    if (
      !mockFullTreeBottom &&
      currentLocation.length > 1 &&
      !currentTree.children
    ) {
      mockFullTreeBottom = currentTree as typeof mockFullTree;
    }
  });

  return {
    allMockLocations,
    mockSimpleTree,
    allMockSimpleTrees,
    allMockSimpleTreeValues,
    mockSimpleTreeTop: mockSimpleTree,
    mockSimpleTreeMiddle,
    mockSimpleTreeBottom,
    mockFullTree,
    allMockFullTrees,
    allMockFullTreeValues,
    mockFullTreeTop: mockFullTree,
    mockFullTreeMiddle,
    mockFullTreeBottom,
  };
};

export default buildMockTreeAll;

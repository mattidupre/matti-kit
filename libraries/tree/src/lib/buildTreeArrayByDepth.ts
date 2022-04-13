import iterateDownTree from './iterateDownTree';

import type { AnyTree } from '../types';

const buildTreeArrayByDepth = <Tree extends AnyTree>(tree: Tree) => {
  const sortedTreeArray: Array<Array<[typeof tree, Array<number>]>> = [];
  iterateDownTree<Tree>(tree, {
    callback: (currentTree, currentTreeLocation) => {
      if (!sortedTreeArray[currentTreeLocation.length]) {
        sortedTreeArray[currentTreeLocation.length] = [];
      }
      sortedTreeArray[currentTreeLocation.length].push([
        currentTree,
        currentTreeLocation,
      ]);
    },
  });
  return sortedTreeArray;
};

export default buildTreeArrayByDepth;

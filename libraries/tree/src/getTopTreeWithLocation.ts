import type { FullTree, FullTreeAtTopFromTree } from './types';

const getTopTreeWithLocation = <Tree extends FullTree>(currentTree: Tree) => {
  let topTree = currentTree;
  const location: Array<number> = [];
  while (topTree.parent) {
    if (topTree.parent) {
      location.unshift(topTree.indexInParent as number);
    }
    topTree = topTree.parent as Tree;
  }
  return [topTree as FullTreeAtTopFromTree<Tree>, location] as const;
};

export default getTopTreeWithLocation;

import type { FullTree, FullTreeAtTopFromTree } from './types';

const getTopTree = <Tree extends FullTree>(currentTree: Tree) => {
  let topTree = currentTree;
  while (topTree.parent) {
    topTree = topTree.parent as Tree;
  }
  return topTree as FullTreeAtTopFromTree<Tree>;
};

export default getTopTree;

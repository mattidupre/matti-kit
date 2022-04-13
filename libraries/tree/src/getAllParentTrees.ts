import type {
  FullTree,
  FullTreeParentFromTree,
  FullTreeAtTopFromTree,
} from './types';

const getAllParentTrees = <Tree extends FullTree>(tree: Tree) => {
  let currentTree = tree;
  const allParentTrees: Array<Tree> = [];
  while (currentTree.parent) {
    allParentTrees.push(currentTree.parent as Tree);
    currentTree = currentTree.parent as Tree;
  }
  return (allParentTrees as unknown) as [
    ...Array<FullTreeParentFromTree<Tree>>,
    FullTreeAtTopFromTree<Tree>,
  ];
};

export default getAllParentTrees;

import type { FullTree, SimpleTree, SimpleTreeFromTree } from './types';

const simplifyTree = <Tree extends FullTree>(tree: Tree) => {
  function recursiveBuildTree(currentTree: FullTree): SimpleTree {
    const newTree = currentTree.children
      ? {
          value: currentTree.value,
          children: currentTree.children.map((childTree) =>
            recursiveBuildTree(childTree),
          ),
        }
      : { value: currentTree.value };
    return newTree;
  }

  return recursiveBuildTree(tree as FullTree) as SimpleTreeFromTree<Tree>;
};

export default simplifyTree;

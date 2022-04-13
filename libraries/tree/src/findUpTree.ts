import type { FullTree } from './types';

const findUpTree = <Tree extends FullTree>(
  tree: Tree,
  { callback }: { callback: (currentTree: Tree) => boolean },
): Tree | undefined => {
  let currentTree: typeof tree | null = tree;
  while (currentTree) {
    if (callback(currentTree)) {
      return currentTree;
    }
    currentTree = currentTree.parent as Tree;
  }
  return undefined;
};

export default findUpTree;

import iterateDownTree from './lib/iterateDownTree';

import type {
  FullTreeAtTopFromTree,
  FullTreeChildFromTree,
  AnyTree,
  BottomTreeValueFromTree,
  ParentTreeValueFromTree,
} from './types';

const mapDownTree = <Tree extends AnyTree>(
  baseTree: Tree,
  {
    callback,
  }: {
    callback?: (
      currentTree: Tree,
      currentLocation: Array<number>,
    ) => BottomTreeValueFromTree<Tree> | ParentTreeValueFromTree<Tree>;
  } = {},
) => {
  let topTree = null as FullTreeAtTopFromTree<Tree>;

  const newTreesMap = new Map<Tree, Tree>();

  iterateDownTree<Tree>(baseTree, {
    callback(currentPrevTree, currentLocation) {
      const indexInParent = currentLocation[currentLocation.length - 1] ?? -1;

      const currentParentTree = (this.parentTree
        ? newTreesMap.get(this.parentTree)
        : null) as null | Tree;

      const currentNewTree = {} as Tree;
      Object.assign(currentNewTree, {
        parent: currentParentTree,
        indexInParent,
        location: currentLocation,
        value: callback
          ? callback(currentPrevTree, currentLocation)
          : currentPrevTree.value,
        children: currentPrevTree?.children ? [] : null,
      } as Tree);

      newTreesMap.set(currentPrevTree, currentNewTree);
      if (!topTree) {
        topTree = currentNewTree as FullTreeAtTopFromTree<Tree>;
      } else if (currentParentTree?.children) {
        currentParentTree.children[
          indexInParent
        ] = currentNewTree as FullTreeChildFromTree<Tree>;
      } else {
        throw new Error('Parent tree not found.');
      }
    },
  });

  return topTree;
};

export default mapDownTree;

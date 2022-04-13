import type { AnyTree } from './types';

const getTreeAtLocation = <Tree extends AnyTree>(
  topTree: Tree,
  location: Array<number>,
) => {
  const currentLocation = [...location];
  let tree: Tree | undefined = topTree;
  while (tree && currentLocation.length) {
    if (!tree.children) {
      return undefined;
    }
    tree =
      (tree?.children[currentLocation.shift() as number] as Tree) ?? undefined;
  }
  return tree;
};

export default getTreeAtLocation;

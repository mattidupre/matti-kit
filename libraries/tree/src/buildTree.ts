import type {
  FullTreeAtTop,
  FullTreeAtTopFromTree,
  FullTree,
  FullTreeAtMiddle,
  SimpleTree,
} from './types';

const buildTree = <Tree extends SimpleTree>(
  baseTree: Tree,
): FullTreeAtTopFromTree<Tree> => {
  function recursiveBuild(
    { value, children }: SimpleTree,
    parentTree: null | FullTreeAtTop | FullTreeAtMiddle,
    location: Array<number>,
  ) {
    const newTree = {
      parent: parentTree,
      indexInParent: location[location.length - 1] ?? -1,
      location,
      children: null,
      value,
    } as FullTree;
    if (children) {
      newTree.children = children.map(
        (childBaseTree: SimpleTree, indexInCurrentTree: number) =>
          recursiveBuild(
            childBaseTree as SimpleTree,
            newTree as FullTreeAtMiddle,
            [...location, indexInCurrentTree],
          ),
      ) as FullTree['children'];
    }
    return newTree;
  }

  return recursiveBuild(
    baseTree as SimpleTree,
    null,
    [],
  ) as FullTreeAtTopFromTree<Tree>;
};

export default buildTree;

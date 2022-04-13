export type TreeValue = unknown;

export type ItemValue = unknown;

export type Tree<
  IV extends ItemValue = TreeValue,
  TV extends TreeValue = IV
> = {
  parent: Tree<TV, IV> | null;
  children: Array<Tree<TV, IV> | Item<TV, IV>> | null;
  location: Array<number>;
  indexInParent: number;
  value: TV;
};

export type Item<
  IV extends ItemValue = TreeValue,
  TV extends TreeValue = IV
> = {
  parent: Tree<TV, IV>;
  children: null;
  location: Array<number>;
  indexInParent: number;
  value: IV;
};

type OnFullTreeRendered = () => void;
export type TreeContextValue = {
  currentTree: Tree | null;
  parentContext: TreeContextValue | null;
  onFullTreeRenderedQueue: Array<OnFullTreeRendered>;
  onFullTreeRendered: (callback: OnFullTreeRendered) => void;
  buildCurrentTree: (indexInParent: number, tree: Tree) => void;
  attachToParent: (indexInParent: number, child: Tree | Item) => void;
};

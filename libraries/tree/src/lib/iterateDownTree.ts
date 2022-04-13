/* eslint-disable no-redeclare */
import type {
  AnyTree,
  TreeParentFromTree,
  TreeChildFromTree,
  AnyTreeFromTree,
} from '../types';

type ParentCallback<Tree extends AnyTree> = (
  this: {
    parentTree: null | TreeParentFromTree<Tree>;
    break: () => void;
  },
  currentTree: TreeParentFromTree<Tree>,
  currentLocation: Array<number>,
) => void;

type ChildCallback<Tree extends AnyTree> = (
  this: {
    parentTree: null | TreeParentFromTree<Tree>;
    break: () => void;
  },
  currentTree: TreeChildFromTree<Tree>,
  currentLocation: Array<number>,
) => void;

type CommonCallback<Tree extends AnyTree> = (
  this: {
    parentTree: null | AnyTreeFromTree<Tree>;
    break: () => void;
  },
  // TODO: Force this to be a parent or a child tree?
  // But if it extends FullList, restrict it to FullList.
  currentTree: Tree,
  currentLocation: Array<number>,
) => void;

function iterateDownTree<Tree extends AnyTree>(
  tree: Tree,
  options:
    | {
        childCallback: ChildCallback<Tree>;
        parentCallback: ParentCallback<Tree>;
        callback?: never;
      }
    | {
        childCallback: ChildCallback<Tree>;
        parentCallback?: never;
        callback?: never;
      }
    | {
        childCallback?: never;
        parentCallback: ParentCallback<Tree>;
        callback?: never;
      }
    | {
        childCallback?: never;
        parentCallback?: never;
        callback: CommonCallback<Tree>;
      },
): void {
  const { childCallback, parentCallback, callback: commonCallback } = options;

  let breakIteration = false;
  const wrappedCallback = (
    currentTree: Tree,
    parentTree: null | TreeParentFromTree<Tree>,
    currentLocation: Array<number>,
  ) => {
    const thisParameter = {
      parentTree,
      break: () => {
        breakIteration = true;
      },
    };

    if (breakIteration) {
      return;
    }

    if (commonCallback) {
      // eslint-disable-next-line consistent-return
      return commonCallback.call(thisParameter, currentTree, currentLocation);
    }

    if (currentTree.children) {
      // eslint-disable-next-line consistent-return
      return parentCallback
        ? parentCallback.call(
            thisParameter,
            currentTree as TreeParentFromTree<Tree>,
            currentLocation,
          )
        : currentTree.value;
    }
    // eslint-disable-next-line consistent-return
    return childCallback
      ? childCallback.call(
          thisParameter,
          currentTree as TreeChildFromTree<Tree>,
          currentLocation,
        )
      : currentTree.value;
  };

  function recursiveIterate(
    currentTree: Tree,
    parentTree: null | TreeParentFromTree<Tree>,
    currentLocation: Array<number>,
  ): Tree {
    wrappedCallback(currentTree, parentTree, currentLocation);
    currentTree.children?.forEach((childTree, childIndex) =>
      recursiveIterate(
        childTree as Tree,
        currentTree as TreeParentFromTree<Tree>,
        [...currentLocation, childIndex],
      ),
    );
    return currentTree;
  }

  recursiveIterate(tree, null, []);
}

export default iterateDownTree;

/* eslint-disable no-lonely-if */
import getTopTree from './getTopTree';

import type { AnyTree, FullTree } from './types';

const allTrees = new Set<AnyTree>();
const allLocations = new Set<Array<number>>();

type Options = {
  allowEmptyChildren?: boolean;
  isSimpleTree?: boolean;
};

const checkTreeIsValid = <Tree extends AnyTree>(
  tree: Tree,
  { allowEmptyChildren = true, isSimpleTree = false }: Options = {},
) => {
  function recursiveCheckTree(
    currentTree: AnyTree,
    derivedLocation: Array<number>,
    isTopTree?: boolean,
  ) {
    const keysStr = Object.keys(currentTree).sort().join(',');
    if (isSimpleTree) {
      if (!(keysStr === 'children,value' || keysStr === 'value')) {
        throw new Error('Simple tree must only contain known keys.');
      }
    } else {
      if (!(keysStr === 'children,indexInParent,location,parent,value')) {
        throw new Error('Full tree must only contain known keys.');
      }
    }

    if (allTrees.has(currentTree)) {
      throw new Error('Trees must not be repeated.');
    }
    allTrees.add(currentTree);

    if (currentTree.children) {
      if (
        !allowEmptyChildren &&
        currentTree.children &&
        currentTree.children.length === 0
      ) {
        throw new Error('Tree cannot have empty children array.');
      }
    } else {
      if (
        !(currentTree.children === undefined || currentTree.children === null)
      ) {
        throw new Error(
          'Bottom trees must have children set to null or undefined.',
        );
      }
    }
    currentTree.children?.forEach(
      (childTree: AnyTree, childIndexInParent: number) =>
        recursiveCheckTree(childTree, [...derivedLocation, childIndexInParent]),
    );

    if (isSimpleTree) {
      return true;
    }

    const currentFullTree = currentTree as FullTree;

    if (allLocations.has(currentFullTree.location)) {
      throw new Error('Tree location references must not be repeated.');
    }
    allLocations.add(currentFullTree.location);

    if (isTopTree) {
      if (currentFullTree.parent !== null) {
        throw new Error('Top tree parent must be null.');
      }
      if (currentFullTree.indexInParent !== -1) {
        throw new Error('Top tree indexInParent must be -1.');
      }
      if (currentFullTree.location?.length !== 0) {
        throw new Error('Top tree location must be [].');
      }
    } else {
      if (!currentFullTree.parent) {
        throw new Error('Child tree must have a parent.');
      }
      const derivedIndexInParent = currentFullTree.parent?.children?.indexOf(
        currentFullTree,
      );
      if (derivedIndexInParent === -1) {
        throw new Error('Tree must exist in parent children array.');
      }
      if (derivedIndexInParent !== currentFullTree.indexInParent) {
        throw new Error('Tree must be at correct position in children array.');
      }
      if (
        currentFullTree.location.length !== derivedLocation.length ||
        !currentFullTree.location.every(
          (l: number, i: number) => l === derivedLocation[i],
        )
      ) {
        throw new Error('Tree location must match indexInParent.');
      }
    }

    return true;
  }

  return recursiveCheckTree(
    (isSimpleTree ? tree : getTopTree(tree as FullTree)) as FullTree,
    [],
    true,
  );
};

export default checkTreeIsValid;

import type { MockFullTree, MockSimpleTree } from './types';

type ThisAnyTree = MockFullTree | MockSimpleTree;

const loopMockTree = (
  tree: ThisAnyTree,
  callback?: (currentTree: ThisAnyTree, location: Array<number>) => void,
) => {
  const callbackQueue: Array<() => void> = [];

  function recursiveForEach(
    currentTree: ThisAnyTree,
    parentTreeReference: {} | null,
    currentLocation: Array<number>,
  ) {
    const newTree = {} as MockFullTree;

    if (callback) {
      callbackQueue.push(() => callback(newTree, currentLocation));
    }

    Object.assign(newTree, {
      parent: parentTreeReference,
      indexInParent: currentLocation[currentLocation.length - 1] ?? -1,
      location: currentLocation,
      children:
        currentTree.children?.map((childTree, childIndex) =>
          recursiveForEach(childTree, newTree, [
            ...currentLocation,
            childIndex,
          ]),
        ) ?? null,
      value: currentTree.value,
    });

    return newTree;
  }

  const result = recursiveForEach(tree, null, []);

  callbackQueue.forEach((cb) => cb());

  return result;
};

export default loopMockTree;

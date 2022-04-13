import {
  getTopTreeWithLocation,
  mapDownTree,
  getTreeAtLocation,
} from '@matti-kit/tree';

import type {
  ListTree,
  ListTreeValue,
  ItemTreeValue,
  ListPayload,
} from '~/types';

const buildPayloadFromTree = (tree: ListTree): ListPayload => {
  const [topTree, location] = getTopTreeWithLocation(tree);
  const payloadTree = mapDownTree(topTree, {
    callback: (currentTree: ListTreeValue | ItemTreeValue) => {
      const { value } = currentTree;

      return {
        meta: value.meta,
        direction: value.listAttributes.direction,
      };
    },
  });
  const payloadTreeAtLocation = getTreeAtLocation(payloadTree, location);
  return payloadTreeAtLocation;
};

export default buildPayloadFromTree;

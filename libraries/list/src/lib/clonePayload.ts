import {
  getTopTreeWithLocation,
  mapDownTree,
  getTreeAtLocation,
} from '@matti-kit/tree';

import type { ListPayload } from '~/types';

const clonePayload = (
  oldPayload: ListPayload,
): ListPayload => {
  const [oldTopPayload, location] = getTopTreeWithLocation(oldPayload);
  const newTopPayload = mapDownTree(oldTopPayload, {
    callback: (payloadValues) => ({
      ...payloadValues,
    }),
  });
  const newPayload = getTreeAtLocation(newTopPayload, location);
  return newPayload;
};

export default clonePayload;

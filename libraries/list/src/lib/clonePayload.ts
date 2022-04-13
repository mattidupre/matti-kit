import {
  getTopTreeWithLocation,
  mapDownTree,
  getTreeAtLocation,
} from '@matti-kit/tree';

import type { Payload } from '@matti-kit/drag';

const clonePayload = <PayloadType extends Payload>(
  oldPayload: PayloadType,
): PayloadType => {
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

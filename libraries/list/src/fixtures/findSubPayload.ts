import type { Payload } from '@matti-kit/drag';

function findSubPayload(currentPayload: Payload, id: string) {
  if (currentPayload.meta.id === id) {
    return currentPayload;
  }
  if (currentPayload.children) {
    let result;
    currentPayload.children.every((childPayload) => {
      result = findSubPayload(childPayload, id);
      return !result;
    });
    return result;
  }
  return undefined;
}

export default findSubPayload;

import type { Payload } from '@matti-kit/drag';

function getTopPayload(payload: Payload) {
  if (!payload.parent) {
    return payload;
  }
  return getTopPayload(payload.parent);
}

function stripPayload(payload: Payload) {
  const clonedPayload = { ...payload };
  if (payload.parent) {
    clonedPayload.parent =
      `REFERENCE ${payload.parent.meta.id}` as unknown as Payload;
  }
  if (payload.children) {
    clonedPayload.children = payload.children.map((childPayload) =>
      stripPayload(childPayload),
    );
  }
  return clonedPayload;
}

expect.extend({
  toMatchPayload(receivedPayload: Payload, testPayload: Payload) {
    const strippedReceivedPayload = stripPayload(
      getTopPayload(receivedPayload),
    );
    const strippedTestPayload = stripPayload(getTopPayload(testPayload));
    const result =
      JSON.stringify(strippedReceivedPayload) ===
      JSON.stringify(strippedTestPayload);
    if (result) {
      return {
        message: () => 'payloads match',
        pass: true,
      };
    }
    return {
      message: () => 'payloads do not match',
      pass: false,
    };
  },
});
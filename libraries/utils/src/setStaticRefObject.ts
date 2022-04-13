import type { MutableRefObject, RefObject } from 'react';

/**
 * Typescript doesn't let us mutate immutable RefObjects.
 */
const setStaticRefObject = <T extends any>(
  refObject?: RefObject<T>,
  value?: T,
) => {
  if (!refObject) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  (refObject as MutableRefObject<T>).current = value;
};

export default setStaticRefObject;

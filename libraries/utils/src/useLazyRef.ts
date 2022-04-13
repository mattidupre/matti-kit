import { useRef } from 'react';

const SENTINEL = {};

const useLazyRef = <T>(init: () => T) => {
  const ref = useRef<T | typeof SENTINEL>(SENTINEL);
  if (ref.current === SENTINEL) {
    ref.current = init();
  }
  return ref as React.MutableRefObject<T>;
};

export default useLazyRef;

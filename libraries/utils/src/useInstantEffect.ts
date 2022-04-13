import { useRef, useEffect } from 'react';
import compareDependencies from './compareDependencies';

type Cleanup = () => void;
type Callback = () => void | Cleanup;
type Deps = Array<any>;

const useInstantEffect = (callback: Callback, deps: Deps) => {
  const mountedRef = useRef<boolean>(false);
  const depsRef = useRef<Deps>();
  const callbackCleanupRef = useRef<ReturnType<Callback>>();

  if (
    !mountedRef.current ||
    !compareDependencies(deps, depsRef.current) ||
    deps === undefined
  ) {
    mountedRef.current = true;
    depsRef.current = deps !== undefined ? [...deps] : undefined;
    if (typeof callbackCleanupRef.current === 'function') {
      callbackCleanupRef.current();
    }
    callbackCleanupRef.current = callback();
  }

  useEffect(
    () => () => {
      if (callbackCleanupRef.current) {
        callbackCleanupRef.current();
      }
    },
    [],
  );
};

export default useInstantEffect;

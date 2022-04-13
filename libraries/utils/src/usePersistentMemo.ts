import { useRef } from 'react';
import compareDependencies from './compareDependencies';

type Callback<T extends any> = () => T;
type Deps = Array<any>;

const usePersistentMemo = <Value extends any>(
  callback: Callback<Value>,
  newDeps: Deps,
) => {
  const valueRef = useRef<Value>(callback());
  const depsRef = useRef<Deps>(newDeps);

  if (!compareDependencies(newDeps, depsRef.current)) {
    valueRef.current = callback();
    depsRef.current = newDeps;
  }

  return valueRef.current;
};

export default usePersistentMemo;

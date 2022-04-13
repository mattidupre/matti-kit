import { useState, useRef, useCallback } from 'react';

const useStateGetter = <Value extends any>(initialValue: Value) => {
  const [stateValue, setStateValue] = useState<Value>(initialValue);
  const ref = useRef<Value>(initialValue);

  const getState = useCallback(() => ref.current, []);

  type SetState = {
    (value: Value): void;
    (value: { (prevValue: Value): void });
  };

  const setState: SetState = useCallback((value) => {
    const newValue = typeof value === 'function' ? value(ref.current) : value;
    ref.current = newValue;
    setStateValue(newValue);
  }, []);

  return [stateValue, setState, getState] as const;
};

export default useStateGetter;

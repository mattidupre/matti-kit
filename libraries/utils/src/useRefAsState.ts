import { useRef, useCallback } from 'react';

const useRefAsState = <Value extends any>(currentValue: Value) => {
  const valueRef = useRef() as { current: Value };
  valueRef.current = currentValue;
  return [
    useCallback(() => {
      return valueRef.current;
    }, []),
    useCallback((value: Value) => {
      valueRef.current = value;
    }, []),
  ] as const;
};

export default useRefAsState;

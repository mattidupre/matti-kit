import { useRef } from 'react';

const useValueRef = (value: any) => {
  const valueRef = useRef(value);
  if (value !== valueRef.current) {
    valueRef.current = value;
  }
  return valueRef;
};

export default useValueRef;

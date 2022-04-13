import { useRef } from 'react';

const initialValue = {};

const useDiff = <Value extends any>(
  value: Value,
  compare?: (val1: Value, val2: Value) => boolean,
) => {
  const valueRef = useRef<Value>(initialValue as Value);
  const isDiff =
    // eslint-disable-next-line no-nested-ternary
    valueRef.current === initialValue
      ? false
      : compare
      ? compare(value, valueRef.current)
      : value !== valueRef.current;
  valueRef.current = value;
  return isDiff;
};

export default useDiff;

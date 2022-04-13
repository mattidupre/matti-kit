import { useCallback, useRef } from 'react';

const useIsDiff = <Value extends Exclude<any, undefined>>(
  initialValue?: Value,
  compare?: (newValue: Value, prevValue: Value) => boolean,
) => {
  const prevValueRef = useRef<Value>(initialValue);
  const currentValueRef = useRef<Value>(initialValue);

  const compareValues = useCallback<typeof compare>(
    (newValue, prevValue) => {
      return compare ? compare(newValue, prevValue) : newValue !== prevValue;
    },
    [compare],
  );

  return useCallback(
    (value?: Value) => {
      if (value === undefined) {
        return compareValues(currentValueRef.current, prevValueRef.current);
      }
      const isDiff = compareValues(value, currentValueRef.current);
      prevValueRef.current = currentValueRef.current;
      currentValueRef.current = value;
      return isDiff;
    },
    [compareValues],
  );
};

export default useIsDiff;

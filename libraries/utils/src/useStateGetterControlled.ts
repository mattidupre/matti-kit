import { useRef } from 'react';
import { isEqual } from 'lodash';
import useStateGetter from './useStateGetter';

const useStateGetterControlled: typeof useStateGetter = <Value>(
  value: Value,
  compare: (value1: Value, value2: Value) => boolean = isEqual,
) => {
  const [valueState, setValueState, getItemIdsState] = useStateGetter<Value>(
    value,
  );

  const valueRef = useRef(value);
  if (!compare(valueRef.current, value)) {
    setValueState(value);
    valueRef.current = value;
  }

  return [valueState, setValueState, getItemIdsState] as const;
};

export default useStateGetterControlled;

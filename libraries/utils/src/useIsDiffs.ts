import { useCallback } from 'react';
import useIsDiff from './useIsDiff';

type Value = Parameters<typeof useIsDiff>[0];
type Compare = Parameters<typeof useIsDiff>[1];

const useIsDiffs = <Values extends Array<Value>>(
  initialValues?: Values,
  compare?: Compare,
) => {
  const compareAllValues = useCallback(
    (values1: Values, values2: Values): ReturnType<Compare> => {
      if (values1?.length !== values2?.length) {
        return false;
      }
      return values1.every((val1, index) =>
        compare ? compare(val1, values2[index]) : val1 !== values2[index],
      );
    },
    [compare],
  );

  return useIsDiff<Values>(
    initialValues === undefined ? ([] as Values) : initialValues,
    compareAllValues,
  );
};

export default useIsDiffs;

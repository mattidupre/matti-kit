import { useRef } from 'react';
import { union } from 'lodash';

type ObjectType = Record<string, any>;

type DiffObj<O extends ObjectType> = Partial<
  Record<string, [O[keyof O], O[keyof O]]>
>;

const useDebugDiff = <Obj extends ObjectType>(
  currentObj: Obj,
  callback: (obj: DiffObj<Obj>) => void,
) => {
  const prevObjRef = useRef(currentObj);
  const allKeys = union(
    Object.keys(currentObj),
    Object.keys(prevObjRef.current),
  );

  const prevObj = prevObjRef.current;
  const prevKeys = Object.keys(prevObj);
  const currentKeys = Object.keys(currentObj);
  const diffObject = {} as DiffObj<Obj>;
  allKeys.forEach((thisKey) => {
    if (!prevKeys.includes(thisKey) || !currentKeys.includes(thisKey)) {
      throw new Error('Object signatures do not match');
    }
    if (prevObj[thisKey] !== currentObj[thisKey]) {
      diffObject[thisKey] = [prevObj[thisKey], currentObj[thisKey]];
    }
  });
  prevObjRef.current = { ...currentObj };
  if (Object.keys(diffObject).length > 0) {
    callback(diffObject);
  }
};

export default useDebugDiff;

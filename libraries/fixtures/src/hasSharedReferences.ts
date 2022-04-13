import { isObject } from 'lodash';

type ObjectType = Record<string, any>;
type ReferenceMap = Map<ObjectType, string>;

function objectFlatReferences(
  obj: ObjectType,
  excludedKeys: Array<string>,
  key: string = '[top]',
  map: ReferenceMap = new Map(),
) {
  if (isObject(obj) && !map.has(obj)) {
    if (!excludedKeys.includes(key)) {
      map.set(obj, key);
    }
    Object.entries(obj).forEach(([childKey, childValue]) => {
      objectFlatReferences(childValue, excludedKeys, childKey, map);
    });
  }
  return map;
}

const compareReferences = (
  references1: ReferenceMap,
  references2: ReferenceMap,
) => {
  references1.forEach((key1, reference1) => {
    if (references2.has(reference1)) {
      const key2 = references2.get(reference1);
      throw new Error(`value of ${key1} matches value of ${key2}`);
    }
  });
};

const hasSharedReferences = (
  obj1: ObjectType,
  obj2: ObjectType,
  excludedKeys: Array<string> = [],
) => {
  const references1 = objectFlatReferences(obj1, excludedKeys);
  const references2 = objectFlatReferences(obj2, excludedKeys);
  compareReferences(references1, references2);
  compareReferences(references2, references1);
};

export default hasSharedReferences;

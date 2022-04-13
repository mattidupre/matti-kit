type IndexArray = Array<number>;

const invalidIndexError = new Error('Invalid index');

export const insertIndex = (arr: Array<any>, toIndex: number): IndexArray => {
  if (toIndex < 0 || toIndex > arr.length) {
    throw invalidIndexError;
  }
  const newIndexes = arr.map((_, index) => index);
  newIndexes.splice(toIndex, 0, -1);
  return newIndexes;
};

export const removeIndex = (arr: Array<any>, fromIndex: number): IndexArray => {
  if (fromIndex < 0 || fromIndex >= arr.length) {
    throw invalidIndexError;
  }
  const newIndexes = arr.map((_, index) => index);
  newIndexes.splice(fromIndex, 1);
  return newIndexes;
};

export const moveIndex = (
  arr: Array<any>,
  fromIndex: number,
  toIndex: number,
): IndexArray => {
  if (fromIndex < 0 || fromIndex >= arr.length) {
    throw invalidIndexError;
  }
  if (toIndex < 0 || toIndex >= arr.length) {
    throw invalidIndexError;
  }
  const newIndexes = arr.map((_, index) => index);
  if (fromIndex === toIndex) {
    return newIndexes;
  }
  const [extractedValue] = newIndexes.splice(fromIndex, 1);
  newIndexes.splice(toIndex, 0, extractedValue);
  return newIndexes;
};

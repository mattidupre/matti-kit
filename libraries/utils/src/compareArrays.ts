type Arr = Array<any>;

const compareArrays = (arr1: Arr, arr2: Arr): boolean => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Arguments must be arrays');
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length || i < arr2.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export default compareArrays;
